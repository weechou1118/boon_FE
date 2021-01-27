import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Input, Form, Button, notification } from 'antd'
import axios from 'axios'
import {BASE_URL} from '../../base'
import './login.less'
import { LOGIN_IN, SET_USER_INFO, SET_AVATAR } from '../../store/constants'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};

const buttonStyle = {
  width: '50%'
}

class Login extends Component {
  // 表单提交失败回调
  onFinishFailed(error) {
    console.log('Failed:', error);
  }
  // 表单提交成功回调
  onFinish(values) {
    axios.post(`${BASE_URL}/api/v2/user/loginVerify`, {...values})
    .then(res=>{
      const data = res.data
      if (data.code === 200) {
        const { history } = this.props
        this.props.handleLoginIn(1, data.token)
        this.props.setUserInfo(data.userInfo)
        this.props.setAvatar(data.avatarUrl)
        history.push('/')
      } else {
        alert(data.msg)
        return false
      }
    })
    console.log(values);
  }
  componentDidMount() {
    const flag = this.props.location.search.split('=').pop()
    if (flag === 'plzlogin') {
      notification.warning({
        message: '请先登录',
        // description: '请先登录',
        onClick: () => {
          console.log('Notification Clicked!');
        },
      });
    }
  }
  render() {
    return (  
      <div className='loginWrapper'>
        <div className='login'>
          <div className='title'>
            <Link to='/'>HOME</Link>
            <i>›</i>
            <span>登录</span>
          </div>
          <div className='content' style={{'textAlign': 'center'}}>
            <Form
              {...layout}
              name="basic"
              initialValues={{ remember: true }}
              autoComplete='off'
              onFinish={this.onFinish.bind(this)}
              onFinishFailed={this.onFinishFailed.bind(this)}
            >
              <Form.Item
                label="用户名/邮箱"
                name="username"
                rules={[
                  { required: true, message: '请输入您的用户名!' },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="密码"
                name="password"
                rules={[{ required: true, message: '请输入您的密码!' }]}
              >
                <Input.Password autoComplete="current-password" />
              </Form.Item>
              <Button type="primary" htmlType="submit" style={buttonStyle}>
                登录
              </Button>
              
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStates = state => {
  return {
    loginState: state.loginState,
    token: '',
    userInfo: {
      nickname: '',
      loginTime: '',
      level: 0    
    }
  }
}

const mapDispatchs = dispatch => {
  return {
    handleLoginIn(loginState, token) {
      dispatch({type: LOGIN_IN, loginState, token})
    },
    setUserInfo(userInfo) {
      dispatch({type: SET_USER_INFO, userInfo})
    },
    setAvatar(avatarUrl) {
      dispatch({type: SET_AVATAR, avatarUrl})
    }
  }
}

export default connect(mapStates, mapDispatchs)(Login);