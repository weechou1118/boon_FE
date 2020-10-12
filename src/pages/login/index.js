import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Input, Form, Button } from 'antd'
import axios from 'axios'
import './login.less'
import { LOGIN_IN, SET_USER_INFO } from '../../store/constants'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};

const buttonStyle = {
  width: '50%'
}

const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};

class Login extends Component {
  async onFinish(values) {
    await axios.post('http://localhost:3001/api/v2/user/loginVerify', {...values})
    .then(res=>{
      const data = res.data
      if (data.code === 200) {
        const { history } = this.props
        this.props.handleLoginIn(1, data.token)
        this.props.setUserInfo(data.userInfo)
        history.push('/')
      } else {
        alert(data.msg)
      }
    })
    console.log('Success:', values);
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
              onFinishFailed={onFinishFailed}
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
                <Input.Password />
              </Form.Item>
              <Button type="primary" htmlType="submit" style={{...buttonStyle}}>
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
    }
  }
}

export default connect(mapStates, mapDispatchs)(Login);