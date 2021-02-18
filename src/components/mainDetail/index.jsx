import React, { Component, createRef, Fragment } from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from '../../base'
import { setCollectionsCount } from '../../store/actions'
import LoadingBox from '../loadingBox'
import './detail.less'

class MainDetail extends Component {
  constructor() {
    super()
    this.state = {
      article: {
        author: {}
      },
      isLoading: true
    }
    this.btn = createRef()
    this.switchCollectionState = this.switchCollectionState.bind(this)
  }
  async componentDidMount () {
    const { match } = this.props
    await axios.get(`${BASE_URL}/api/v2/article/` + match.params.id, {
      params: {
        q_uid: this.props.userInfo.id
      }
    })
      .then(res => {
        const data = res.data.data
        const collState = data.hasCo ? 1 : 0
        this.setState({
          article: data,
          isLoading: false,
          collState
        })
      })
  }
  switchCollectionState () {
    const {
      uId,
      arId
    } = this.getNess()
    let doWhat = ''
    this.state.collState === 0 ? doWhat = 'add' : doWhat = 'remove'
    axios.post(`${BASE_URL}/api/v2/collections/${doWhat}`, {
      uId,
      arId
    })
      .then(res => {
        let collState = this.state.collState === 0 ? 1 : 0
        console.log(collState)
        this.setState({
          collState
        })
        this.props.handleSetCollectionsCount(this.props.userInfo.id)
      })
  }
  getNess () {
    return {
      arId: this.props.match.params.id,
      uId: this.props.userInfo.id
    }
  }
  render () {
    const { title, content, createdAt, author } = this.state.article
    return (
      <div className='box'>
        {
          this.state.isLoading ?
            <LoadingBox styles={{ 'height': '200px' }} />
            :
            <>
              <header>
                <Fragment>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <picture className='avatar_box'>
                            <img src={author.avatar} width='32' alt='avatar' />
                          </picture>
                        </td>
                        <td>
                          <a href='/'><strong className='author'>{author.nickname}</strong></a>
                          {/* <i className='levelTag'>Lv{author.level}</i> */}
                          <br />
                          <span className='createdTime'>{createdAt.split('T')[0]}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <h1>{title}</h1>
                </Fragment>
              </header>
              <div className='articleBody' dangerouslySetInnerHTML={{ __html: content }}></div>
              <div className='cell'>
                {
                  this.state.collState === 0?
                  <button className='collBtn' onClick={() => this.switchCollectionState()}>加入收藏</button>
                  :
                  <button className='collBtn' onClick={() => this.switchCollectionState()}>取消收藏</button>
                }
              </div>
            </>
        }
      </div>
    );
  }
}

const mapState = state => {
  return {
    userInfo: state.userInfo
  }
}
const mapDispatch = dispatch => {
  return {
    handleSetCollectionsCount(args) {
      dispatch(setCollectionsCount(args))
    }
  }
}

export default connect(mapState, mapDispatch)(MainDetail);