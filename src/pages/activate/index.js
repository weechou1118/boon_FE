import React, { Component } from 'react';
import { connect } from 'react-redux'
import { SET_TOKEN } from '../../store/constants'
import axios from 'axios'

class Activate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      level: 0
    }
  }
  componentDidMount() {
    const key = this.props.location.search.split(/\?|=/).pop()
    axios.post('http://localhost:3001/api/v2/activate', {key})
    .then(res=> {
      this.setState({
        level: 1
      })
      this.props.handleSetToken(res.data.token)
    })
  }
  render() { 
    return (  
      <div>
      {
        this.state.level === 0?
        <div>激活中</div>:
        <div>激活成功...即将跳转到首页</div>
      }
      </div>
    );
  }
}
const mapStates = state => {
  return {
    token: state.token
  }
}
const mapDispatchs = dispatch => {
  return {
    handleSetToken(token) {
      dispatch({type: SET_TOKEN, token })
    }
  }
}

export default connect(mapStates,mapDispatchs)(Activate)