import React, { Component } from 'react';

import './header.less'

class Header extends Component {
  render() {
    return (
      <nav className='headerWrapper'>
        <div className='header'>
          <div className='logo'></div>
          <div className='headerLeft'>
            <div className='searchWrapper cwp'>
              <div className='search'>
                <input type='input'  />
                <i className='iconfont'>&#xe682;</i>
              </div>
            </div>
          </div>
          <div className='menuWrapper cwp'>
            <div className='headerRight'>
              <a href='/'>首页</a>
              <a href='/'>注册</a>
              <a href='/'>登录</a>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default Header