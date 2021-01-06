import React, {
  Component
} from 'react';
import axios from 'axios'
import {BASE_URL} from '../../base'
import './tagsLine.less'

class TagsLine extends Component {
  constructor() {
    super()
    this.state = {
      replyTimeLast: '2020/1/4 11:03',
      comments:[],
      // template: {
      //   'replyCount': 1,
      //   'avatar': 'http://localhost:3001/api/v2/img/1',
      //   'author': '',
      //   'timeUntil': '',
      //   'content': ''
      // }
    }
  }
  componentDidMount() {
    console.log(this.props)
    axios.get(`${BASE_URL}/api/v2/comment/1`)
    .then(res => {
      const data = res.data.data
      const state = this.state
      state.comments = data
      this.setState({
        ...state
      })
    })
  }
  render() {
    return (
      <div className='box comments_table'>
        <div className='cell' style={{'borderTop': 'none','paddingTop': '0'}}>
          <span className='gray'>{this.state.comments.length}条回复&nbsp;·&nbsp;{this.state.replyTimeLast}</span>
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
}

export default TagsLine