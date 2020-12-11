import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './unLoginMe.less'

class UnLoginMe extends Component {
  render() { 
    return (  
      <div className='default box'>
        <div className='cell'>
          <p>你可以在HOI分享你的创作</p>
        </div>
        <div>
          <a className='registerBtn' href='/register'>现在注册</a>
          <br />
          <p style={{'color': '#000'}}>已注册用户请<Link to='/login'>登录</Link></p>
        </div>
      </div>
    );
  }
}
 
export default UnLoginMe;