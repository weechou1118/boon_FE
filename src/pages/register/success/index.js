import React, { Component } from 'react';
import './success.less'

class RegisterSuccess extends Component {
  state = {  }
  constructor(props) {
    super(props)
    this.btnRef = React.createRef()
  }
  componentDidMount() {
    const email = this.props.location.state.email
    this.setState({
      email
    })
    const cut = email.split(/.com|.cn|@/)
    const target = cut[cut.length-2]
    let url = '/'
    switch (target) {
      case '163':
        url = 'https://mail.163.com/'
        break;
      case 'qq':
        url = 'https://mail.qq.com/'
        break;
      default:
        break;
    }
    this.btnRef.current.href = url
  }
  render() { 
    return (  
      <div id='RegisterSuccess'>
        <div className='wrapper'>
          我们已经向您的邮箱：
          <h1>{ this.state.email }</h1>
          发送了确认邮件，请收到邮件后点击邮件中的确认链接
          <a href='/#' ref={this.btnRef}>立即去我的邮箱确认</a>
        </div>
      </div>
    );
  }
}
 
export default RegisterSuccess;