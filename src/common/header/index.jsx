import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Link, withRouter, NavLink } from 'react-router-dom'
import { LOGIN_OUT } from '../../store/constants'
import {Menu, Dropdown} from 'antd'
import {DownOutlined, UnorderedListOutlined } from '@ant-design/icons'

import './header.less'

class Header extends Component {
  headerRef = React.createRef();
  state = {
    dropdown: ['item1', 'item2', 'item3'],
    menus: ['前端', '后端', '开发工具', '阅读']
  }
  verticalMenuRef = null
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
  showVerticalMenu() {
    let vmrc = this.verticalMenuRef.classList
    vmrc.contains('hidden')?vmrc.remove('hidden'):vmrc.add('hidden')
    
  }
  render() {
    // const menu = (
    //   <Menu>
    //     {
    //       this.state.dropdown.map((item, index) => {
    //         return (
    //           <Menu.Item key={index}>
    //             {item}
    //           </Menu.Item>
    //         )
    //       })
    //     }
    //   </Menu>
    // )
    const menu = (
      <Menu>
        <Menu.Item key="1">
          <Link to="/login">去登录</Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">
          <Link to="/register">去注册</Link>
        </Menu.Item>
      </Menu>
    )
    const styles = {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 30,
      marginLeft: 5
    }
    return (
      <Fragment>
        <header id='Top' ref={this.headerRef}>
          <div className='header'>
            <a href='/' className='logo'><div></div></a>
            <div className='headerLeft'>
              <div className='searchWrapper cwp'>
                <div className='search'>
                  <input type='input' />
                  <i className='iconfont'>&#xe682;</i>
                </div>
              </div>
              {
                this.props.loginState === 1?
                null:
                <Dropdown overlay={menu} trigger={['click']}>
                  <UnorderedListOutlined id='ScreenSmallSizeList' style={{...styles}}/>
                </Dropdown>
              }
            </div>
            <div className='menuWrapper cwp'>
              <div className='headerRight'>
                <Link to='/'>首页</Link>
                {
                  this.props.loginState === 1?
                  <NavLink to='/new'>开始创作<DownOutlined /></NavLink>
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
              <div className='avatar' onClick={this.showVerticalMenu.bind(this)}>
                <img alt='' src={this.props.avatarUrl} />
                <div className='verticalMenu hidden' ref={menu =>this.verticalMenuRef=menu}>
                  <p><NavLink to='/'>个人主页</NavLink></p>
                  <p><NavLink to='/new'>写文章</NavLink></p>
                  <p><Link to='/loginout' onClick={this.loginout.bind(this)}>登出</Link></p>
                </div>
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
              <NavLink to='/' className='active'>推荐</NavLink>
              <NavLink className='menu-link' activeClassName='active' to='/qd'>前端</NavLink>
              <NavLink className='menu-link' activeClassName='active' to='/hd'>后端</NavLink>
              <NavLink className='menu-link' activeClassName='active' to='/gj'>工具</NavLink>
              <NavLink className='menu-link' activeClassName='active' to='/yd'>阅读</NavLink>
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