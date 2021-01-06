import React, { Component } from 'react';
import { connect } from 'react-redux'
import { SET_TOKEN, REGISTER_SUCC,SET_USER_INFO } from '../../../store/constants'
import axios from 'axios'
import {BASE_URL} from '../../../base'

class Activate extends Component {
  componentDidMount() {
    const key = this.props.location.search.split(/\?|=/).pop()
    axios.post(`${BASE_URL}/api/v2/activate`, {key})
    .then(res=> {
      const data = res.data
      if (data.code === 200) {
        this.props.registerSucc()
        this.props.setUserInfo(data.userInfo)
        this.props.handleSetToken(data.token)
        setTimeout(() => {
          this.props.history.push('/')
        }, 3000);
      }
    })
  }
  render() { 
    return (  
      <div>
      {
        this.props.level === 0?
        <div>激活中</div>:
        <div>激活成功...即将跳转到首页</div>
      }
      </div>
    );
  }
}
const mapStates = state => {
  return {
    token: state.token,
    level: state.userInfo.level
  }
}
const mapDispatchs = dispatch => {
  return {
    handleSetToken(token) {
      dispatch({type: SET_TOKEN, token })
    },
    registerSucc() {
      dispatch({type: REGISTER_SUCC})
    },
    setUserInfo(userInfo) {
      dispatch({type: SET_USER_INFO, userInfo})
    }
  }
}

export default connect(mapStates,mapDispatchs)(Activate)