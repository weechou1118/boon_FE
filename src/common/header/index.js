import React, { Component } from 'react';
import { Link } from 'react-router-dom'

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
              <Link to='/'>首页</Link>
              <Link to='/register'>注册</Link>
              <Link to='/login'>登录</Link>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default Header