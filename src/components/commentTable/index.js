import React, {
  Component
} from 'react';
import axios from 'axios'
import {BASE_URL} from '../../base'
import './tagsLine.less'
import LoadingBox from '../loadingBox'

class TagsLine extends Component {
  constructor() {
    super()
    this.state = {
      replyTimeLast: '2020/1/4 11:03',
      comments:[],
      isloading: true
    }
  }
  componentDidMount() {
    axios.get(`${BASE_URL}/api/v2/comment/${this.props.match.params.id}`)
    .then(res => {
      const data = res.data.data
      const state = this.state
      state.comments = data
      state.isloading = false
      this.setState({
        ...state
      })
    })
  }
  render() {
    const styles = {'borderTop': 'none','paddingTop': '0'}
    return (
      <>
        {
          this.state.loading?
          <LoadingBox/>:
          (
          <div className='box comments_table'>
          <div className='cell' style={styles}>
            {
              this.state.comments.length>0?
              <span className='gray'>{this.state.comments.length}条回复&nbsp;·&nbsp;{this.state.replyTimeLast}</span>
              :
              <span className='empty'>这篇文章还没有人评论噢~</span>  
            }
          </div>
          {
            this.state.comments.map((item, index) => {
              return (
                <div className='cell' key={index}>
                  <table width='100%'>
                    <tbody>
                      <tr>
                        <td width='48'>
                          <img className='r_avatar' alt='' width='32' height='32' src={item.from_avatar} />
                        </td>
                        <td width='auto'>
                          <div className='dark'>{item.from_nickname}&nbsp;·&nbsp;<span className='ago'>{item.howLongAgo}</span>
                          <i className='iconfont reply'>&#xe64d;</i>
                          </div>
                          {/* 评论列表 */}
                          <div>{
                            item.to_nickname? (
                              <>
                                @<a href='/' className='to_nick'>{item.to_nickname}</a>
                              </>
                            ):
                            ''
                          } {item.content}</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )
            })
          }
          </div>
          )
        }  
      </>
    )
  }
}

export default TagsLine