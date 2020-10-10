import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { LOGIN_OUT } from '../../store/constants'

import './header.less'

class Header extends Component {
  loginout() {
    // const { history } = this.props
    this.props.handleLoginOut()
  }
  render() {
    return (
      <nav id='Top'>
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
              {
                this.props.loginState === 1?
                null
                :
                <Link to='/register'>注册</Link>
              }
              
              {
                this.props.loginState===1?
                <Link to='/loginout' onClick={this.loginout.bind(this)}>登出</Link>
                :
                <Link to='/login'>登录</Link>
              }
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

const mapStates = state => {
  return {
    loginState: state.loginState
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