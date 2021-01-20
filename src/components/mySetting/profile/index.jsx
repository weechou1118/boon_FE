import React, { Component } from 'react';
import {connect} from 'react-redux'
import './profile.less'

class Profile extends Component {
  render() { 
    return (
      <form id='profile'>
        <table>
          <tbody>
            <tr>
              <td>用户名:</td>
              <td>{this.props.userInfo.nickname}</td>
            </tr>
            <tr>
              <td>手机号:</td>
              <td><span style={{'color': 'red'}}>未验证手机号</span></td>
            </tr>
            <tr>
              <td>电子邮箱:</td>
              <td>{this.props.userInfo.email}</td>
            </tr>
            <tr>
              <td>个人网站:</td>
              <td><input type='text'></input></td>
            </tr>
          </tbody>
        </table>
      </form>  
    );
  }
}

const mapState = state => {
  return {
    userInfo: state.userInfo
  }
}

export default connect(mapState)(Profile);