import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { LOGIN_OUT } from '../../store/constants'
import {Menu, Dropdown} from 'antd'
import {DownOutlined} from '@ant-design/icons'
import '../../../node_modules/antd/dist/antd.css'

import './header.less'

class Header extends Component {
  headerRef = React.createRef();
  state = {
    dropdown: ['item1', 'item2', 'item3']
  }
  menu = (
    <Menu>
      {
        this.state.dropdown.map((item, index) => {
          return (
            <Menu.Item key={index}>
              {item}
            </Menu.Item>
          )
        })
      }
    </Menu>
  )
  componentDidMount() {
    const _this = this;
    window.onscroll = function(e) {
      const windowHeight = document.documentElement.scrollTop;
      if (windowHeight >= 100) {
        _this.headerRef.current.classList.add('fixed');
      } else {
        _this.headerRef.current.classList.remove('fixed');
      }
    }
  }
  loginout() {
    this.props.handleLoginOut()
  }
  handleMenuClick() {
    console.log('a')
  }
  render() {
    return (
      <Fragment>
        <header id='Top' ref={this.headerRef}>
          <div className='header'>
            <a href='/' className='logo'><div></div></a>
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
                  <Dropdown trigger={['click']} overlay={this.menu}>
                    <a onClick={(e) => e.preventDefault()} href="/#">开始创作<DownOutlined /></a>
                  </Dropdown>
                  :
                  null
                }
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
            {
              this.props.loginState === 1?
              <div className='avatar'>
                <img alt='' src={this.props.avatarUrl} />
              </div>
              :
              null
            }
          </div>
        </header>
        {
          this.props.history.location.pathname === '/'?
          <nav ref={this.navRef}>
            <div id='Tab'>
              <a href='/' className='tab_current'>推荐</a>
              <a href='/'>前端</a>
              <a href='/'>后端</a>
              <a href='/'>开发工具</a>
              <a href='/'>阅读</a>
            </div>
          </nav>
          :
          null
        }
      </Fragment>
    )
  }
}

const mapStates = state => {
  return {
    loginState: state.loginState,
    userInfo: state.userInfo,
    avatarUrl: state.avatarUrl
  }
}

const mapDispatchs = dispatch => {
  return {
    handleLoginOut() {
      dispatch({type: LOGIN_OUT})
    }
  }
}
export default withRouter(connect(mapStates, mapDispatchs)(Header))