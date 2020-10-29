import axios from 'axios';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import localStorage from 'redux-persist/es/storage';
import { RESET_USER_STATE } from '../../store/constants'
import Hotheme from '../../components/hotheme'
// import Hotnode from '../../common/hotnode'
// import Community from '../../common/community/'

import Me from '../../components/me'
import Main from '../../components/main'

import './home.less'

class Home extends Component {
  componentDidMount() {
    localStorage.getItem('persist:root')
    .then(res=> {
      const token = this.props.token
      return axios.post('http://localhost:3001/api/v2/tokenVerify',{},{
        headers:{
          'Authorization': 'Basic ' + token
        }
      })
    })
    .then(res=> {
      const data = res.data
      if (data.code !== 200) {
        this.props.handleSetUserState(0, '') 
      }
    })
  }
  render() { 
    return (  
      <Fragment >
        <div id="Rightbar">
          {
            this.props.loginState === 1?
            <Me />
            :
            <div className='default box'>
              <div className='cell'>
                <p>你可以在HOI分享你的创作</p>
              </div>
              <div>
                <a className='registerBtn' href='/register'>现在注册</a>
                <br />
                <p style={{'color': '#000'}}>已注册用户请<a href='/login'>登录</a></p>
              </div>
            </div>
          }

          {
            this.props.loginState === 1?
            <Fragment>
              <div style={{'height': '20px'}}></div>
              <div className='inner'>
                <i className='iconfont'>&#xe63c;</i>
                &nbsp;领取今日的登录奖励
              </div>
              <div style={{'height': '1px','margin': '20px 0','boxShadow': '0 0 3px rgba(0, 0, 0, .2)'}}></div>
              <div className='inner'>
                <span>我收藏的节点</span>
              </div>
            </Fragment>
            :
            null
          }

          <Hotheme />

          {/* <Hotnode /> */}

          {/* <Community /> */}
        </div>

        {/* 因为浮动特性, 需要将main放在浮动元素后面 */}
        {/* 子组件的props需要由父组件传入 */}
        <Main {...this.props}/>
        
      </Fragment>
    );
  }
}
const mapStates = state => {
  return {
    loginState: state.loginState,
    token: state.token
  }
}

const mapDispatchs = dispatch => {
  return {
    handleSetUserState(loginState, token) {
      dispatch({type: RESET_USER_STATE, loginState, token})
    }
  }
}
 
export default connect(mapStates, mapDispatchs)(Home);