import React, { Component } from 'react';
import './main.less'


class Main extends Component {
  constructor() {
    super()
    this.sortHot = this.sortHot.bind(this)
    this.sortLatest = this.sortLatest.bind(this)
    this.goArticle = this.goArticle.bind(this)
    this.state = {
      news: [
        {
          title: '一个美国小码农眼中的硅谷',
          tag: '程序员',
          po: 'leshi1122',
          punish_time: '25分钟前',
          like_count: 2,
          comments_count: 4,
          sortt: 1
        },
        {
          title: '如果不考虑工资,你最想从事哪种职业',
          tag: '程序员',
          po: 'tonnycao',
          punish_time: '1分钟前',
          like_count: 9,
          comments_count: 14,
          sortt: 2
        },
      ]
    }
  }
  componentDidMount() {
    // UI事件
    this.switchActive()
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
  // 模拟数据查询查询
  sortHot() {
    const news = this.state.news
    news.sort((a,b) => a.sortt - b.sortt)
    this.setState({
      news
    })
  }
  sortLatest() {
    const news = this.state.news
    news.sort((a,b) => b.sortt - a.sortt)
    this.setState({
      news
    })
  }
  goArticle() {
    this.props.history.push('/article')
  }
  render() { 
    return (  
      <div id='Main'>
        <div className='box'>
          <div id='Cell' className='subTab' ref={div => {this.subTab = div}}>
            <a href='/' className='active' onClick={this.sortHot}>热门</a>
            <a href='/' onClick={this.sortLatest}>最新</a>
          </div>
          {
            this.state.news.map((item, index)=> {
              return (
                <div onClick={this.goArticle} ref={div => this.vlink = div} to='/login' className='cell item' key={index}>
                  <a href='/'><div className='avatar'></div></a>
                  <div className='itemContent'>
                    <p>{item.title}</p>
                    <p><i className='node'>{item.tag}</i>&nbsp;·&nbsp;<strong><a href='/'>{item.po}</a></strong>&nbsp;·&nbsp;{item.punish_time}</p>
                  </div>
                  <div className='countsBox'>
                    <p><i className='iconfont'>&#xe668;</i>{item.like_count}</p>
                    <p><i className='iconfont'>&#xe884;</i>{item.comments_count}</p>
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
export default Main;