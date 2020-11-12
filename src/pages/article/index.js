import React, { Component } from 'react';
import MainDetail from '../../components/mainDetail'
import Me from '../../components/me'
import './article.less'

class Article extends Component {
  render() { 
    return (  
      <div className='container main-container'>
        <div className='sidebar'>
          <Me {...this.props}/>
        </div>
        <div className='main-area article-area'>
          <MainDetail {...this.props}/>
        </div>
      </div>
    );
  }
}
 
export default Article;