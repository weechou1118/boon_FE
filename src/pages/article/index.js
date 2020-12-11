import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import MainDetail from '../../components/mainDetail'
import Me from '../../components/me'
import UnLoginMe from '../../components/unLoginMe'
import './article.less'

class Article extends Component {
  render() { 
    return (  
      <div className='container main-container'>
        <div className='sidebar'>
          {
            this.props.loginState === 1?
            <Me {...this.props}/>:
            <UnLoginMe {...this.props}/>
          }
        </div>
        <div id='Main' className='main-area article-area'>
          <MainDetail {...this.props}/>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    loginState: state.loginState,
    tolen: state.token
  }
}

const mapDispatchs = dispatch => {
  return {

  }
}
 
export default connect(mapState, mapDispatchs)(Article);