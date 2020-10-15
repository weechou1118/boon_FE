import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { LOGIN_OUT } from '../../store/constants'

import './header.less'

class Header extends Component {
  headerRef = React.createRef();
  componentDidMount() {
    const _this = this;
    window.onscroll = function(e) {
      const windowHeight = document.documentElement.scrollTop;
      if (windowHeight >= 100) {
        _this.headerRef.current.classList.add('fixed');
      } else {
        _this.headerRef.current.classList.remove('fixed')
      }
    }
  }
  loginout() {
    this.props.handleLoginOut()
  }
  render() {
    return (
      <Fragment>
        <header id='Top' ref={this.headerRef}>
          <div className='header'>
            <a href='/'><div className='logo'></div></a>
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
                {
                  this.props.loginState === 1?
                  <Link to='/'>
                    <b>{this.props.userInfo.nickname}</b>
                  </Link>
                  :
                  null
                }

                {
                  this.props.loginState === 1?
                  null
                  :
                  <Link to='/register'>注册</Link>
                }
                
                {
                  this.props.loginState ===1 ?
                  <Link to='/loginout' onClick={this.loginout.bind(this)}>登出</Link>
                  :
                  <Link to='/login'>登录</Link>
                }
              </div>
            </div>
          </div>
        </header>
        <nav ref={this.navRef}>
          <div id='Tab'>
            <a href='/' className='tab_current'>推荐</a>
            <a href='/'>前端</a>
            <a href='/'>后端</a>
            <a href='/'>开发工具</a>
            <a href='/'>阅读</a>
          </div>
        </nav>
      </Fragment>
    )
  }
}

const mapStates = state => {
  return {
    loginState: state.loginState,
    userInfo: state.userInfo
  }
}

const mapDispatchs = dispatch => {
  return {
    handleLoginOut() {
      dispatch({type: LOGIN_OUT})
    }
  }
}
export default connect(mapStates, mapDispatchs)(Header)