import React, { Component } from 'react';
import {connect} from 'react-redux'
import axios from 'axios'
import {BASE_URL} from '../../base'
import './main.less'


class Main extends Component {
  constructor() {
    super()
    this.goArticle = this.goArticle.bind(this)
    this.likehandler = this.likehandler.bind(this)
    this.getAllArticle = this.getAllArticle.bind(this)
    this.state = {
      news: [],
      likeStyle: {
        backgroundColor: '#ffc508b9'
      }
    }
  }
  componentDidMount() {
    // UI事件
    this.switchActive()

    // 获取所有文章数据
    this.getAllArticle()
  }
  getAllArticle(con) {
    let url = `${BASE_URL}/api/v2/article`
    switch (con) {
      case 1:
        url += '/latest'
        break;
    
      default:
        break;
    }
    axios.get(url)
    .then(res => {
      const data = res.data.data
      this.setState({
        news: data
      })
    })
  }
  switchActive() {
    this.subTab.querySelectorAll('a').forEach(item => {
      item.onclick = (e) => {
        e.preventDefault()
        for (item of e.target.parentNode.children) {
          item.classList.remove('active')
        }
        e.target.classList.add('active')
      }
    })
  }
  goArticle(e) {
    this.props.history.push('/article/' + e.target.closest('.item').getAttribute('data-article-id'))
  }
  likehandler(e, arId) {
    // 禁止冒泡
    e.stopPropagation() 
    // 视图层逻辑
    let likeBtn = e.target.closest('p')
    let likeState = likeBtn.classList.contains('active')
    let spanEL = likeBtn.querySelectorAll('span')[0]
    let count = spanEL.innerHTML
    if (likeState) {
      likeBtn.classList.remove('active')
      spanEL.innerHTML= --count
    } else {
      likeBtn.classList.add('active')
      spanEL.innerHTML= ++count
    }

    axios.post(`${BASE_URL}/api/v2/like`, {
      arId,
      uId: this.props.uId,
      state: likeState ? 0 : 1
    })
    .then(res => {
      // console.log(res)
    })
  }
  render() { 
    return (
      <div id='Main'>
        <div className='box'>
          <div id='Cell' className='subTab' ref={div => {this.subTab = div}}>
            <a href='/' onClick={() => this.getAllArticle(0)} className='active'>热门</a>
            <a href='/' onClick={() => this.getAllArticle(1)}>最新</a>
          </div>
          {
            this.state.news.map((item, index)=> {
              return (
                <div data-article-id={item.id} onClick={(e) => this.goArticle(e)} ref={div => this.vLink=div} to='/login' className='cell item' key={index}>
                  <a href='/'>
                    <img width='48' height='48' className='avatar' alt='' src={item.avatar}/>
                  </a>
                  <div className='itemContent'>
                    <a href={'/article/' + item.id}>{item.title}</a>
                    <p><i className='node'>{item.tags}</i>&nbsp;·&nbsp;<strong><a href='/'>{item.author}</a></strong>&nbsp;·&nbsp;{item.howLongAgo}</p>
                  </div>
                  <div className='countsBox'>
                    <p onClick={(e) => this.likehandler(e, item.arId)}><i className='iconfont'>&#xe668;</i><span>{item.niceCount}</span></p>
                    <p><i className='iconfont'>&#xe884;</i><span>{item.commentsCount}</span></p>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}
const mapStates = state => {
  return {
    uId: state.userInfo.uId
  }
}

export default connect(mapStates)(Main);