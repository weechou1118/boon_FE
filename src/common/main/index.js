import React, { Component } from 'react';
import './main.less'

class Main extends Component {
  render() { 
    return (  
      <div id='Main'>
        <div className='box'>
          <div id='Cell' className='subTab'>
            <a href='/' className='active'>热门</a>
            <a href='/'>最新</a>
          </div>
          {
            [1,2,3,4,5].map(item=> {
              return (
                <div className='cell item' key={item}>
                  <a href='/'><div className='avatar'></div></a>
                  <div className='itemContent'>
                    <p>一个美国小码农眼中的硅谷</p>
                    <p><i className='node'>程序员</i>&nbsp;·&nbsp;<strong><a href='/'>leishi1313</a></strong>&nbsp;·&nbsp;25分钟前·最后回复来自<strong><a href='/'>&nbsp;lua</a></strong></p>
                  </div>
                  <div className='commentCount'><a className='count_livid' href='/'>3</a></div>
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