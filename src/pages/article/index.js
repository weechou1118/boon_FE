/*
 * @Description: 
 * @Version: 1.0
 * @Autor: zhou wei
 * @Date: 2020-10-29 15:14:26
 * @LastEditors: zhou wei
 * @LastEditTime: 2021-02-18 15:58:47
 */
import React, { Component } from 'react';
import {connect} from 'react-redux'
import MainDetail from '../../components/mainDetail'
import CommentTable from '../../components/commentTable'
import CommentNew from '../../components/commentNew/'
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
          <div className='sep20'></div>
          <CommentTable {...this.props}/>
          <div className='sep20'></div>
          <CommentNew {...this.props}/>
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