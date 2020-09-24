import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Input, Form, Button } from 'antd'
import './login.less'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};

const buttonStyle = {
  width: '50%'
}

const onFinish = values => {
  console.log('Success:', values);
}

const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};

class Login extends Component {
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
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="用户名"
                name="username"
                rules={[{ required: true, message: '请输入您的用户名!' }]}
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

export default Login;