import axios from 'axios';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import localStorage from 'redux-persist/es/storage';
import { RESET_USER_STATE } from '../../store/constants'

import Me from '../../common/me'
import Main from '../../common/main'

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
      console.log(res)
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
          <Me />
        </div>
        <Main />
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