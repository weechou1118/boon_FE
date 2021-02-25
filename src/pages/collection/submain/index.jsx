import React, { Component } from 'react';
import axios from 'axios'
import { connect } from 'react-redux'
import { BASE_URL } from '../../../base'

class Submain extends Component {
  constructor(props) {
    super(props)
    this.state = {
      articles: []
    }
  }
  componentDidMount () {
    this.getCollectionsList(this.props.type)
  }
  getCollectionsList (type) {
    axios.get(`${BASE_URL}/api/v2/collections`, {
      headers: {
        'Authorization': 'Basic ' + this.props.token
      },
      params: {
        type
      }
    })
      .then(res => {
        const articles = res.data.data
        this.setState({
          articles
        })
      })
  }
  goArticle (e) {
    this.props.history.push('/article/' + e.target.closest('.item').getAttribute('data-article-id'))
  }
  // TODO: 这是个冗余方法
  likehandler (e, arId) {
    // 禁止冒泡
    e.stopPropagation()

    // 视图层逻辑
    let likeBtn = e.target.closest('p')
    let likeState = likeBtn.classList.contains('active')
    let spanEL = likeBtn.querySelectorAll('span')[0]
    let count = spanEL.innerHTML

    if (likeState) {
      // 在ios safari中不兼容
      likeBtn.classList.remove('active')
      spanEL.innerHTML = --count
    } else {
      // 小动画
      likeBtn.classList.add('nicenice')
      setTimeout(() => {
        likeBtn.classList.toggle('nicenice')
      }, 500);

      likeBtn.classList.add('active')
      spanEL.innerHTML = ++count
    }

    axios.post(`${BASE_URL}/api/v2/like`, {
      arId,
      uId: this.props.userInfo.id,
      state: likeState ? 0 : 1
    })
      .then(res => {
      })
  }
  render () {
    return (
      <>
        {
          this.state.articles.map((item, index) => {
            return (
              <div data-article-id={item.id} onClick={(e) => this.goArticle(e)} ref={div => this.vLink = div} to='/login' className='cell item' key={index}>
                <a onClick={(e) => { e.stopPropagation() }} href={'/member/' + item.author}>
                  <img width='48' height='48' className='avatar' alt='' src={item.avatar} />
                </a>
                <div className='itemContent'>
                  <a href={'/article/' + item.id}>{item.title}</a>
                  <p><i className='node'>{item.tags}</i>&nbsp;·&nbsp;<strong><a href={`/member/${item.author}`} onClick={e => e.stopPropagation()}>{item.author}</a></strong>&nbsp;·&nbsp;{item.howLongAgo}</p>
                </div>
                <div className='countsBox'>
                  <p className={item.loveState === 1 ? 'active' : ''} onClick={(e) => this.likehandler(e, item.id)}><i className='iconfont'>&#xe668;</i><span>{item.niceCount}</span></p>
                  <p><i className='iconfont'>&#xe884;</i><span>{item.commentsCount}</span></p>
                </div>
              </div>
            )
          })
        }
      </>
    );
  }
}
const mapState = state => {
  return {
    token: state.token,
    userInfo: state.userInfo
  }
}

export default connect(mapState)(Submain);