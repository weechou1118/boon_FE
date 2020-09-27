import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import localStorage from 'redux-persist/es/storage';
import { RESET_USER_STATE } from '../../store/constants'

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
      <div>
        this is home
      </div>
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