import React, { Component } from 'react';
import MainDetail from '../../components/mainDetail'
import './article.less'

class Article extends Component {
  render() { 
    return (  
      <div className='container main-container'>
        <div className='main-area'>
          <MainDetail {...this.props}/>
        </div>
        <div className='sidebar'></div>
      </div>  
    );
  }
}
 
export default Article;