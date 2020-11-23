import React, { Component } from 'react';
import axios from 'axios'
import './community.less'

class Community extends Component {
  componentDidMount() {
    axios.get('https://www.v2ex.com/feed/tab/tech.xml')
    .then(res=> {
      console.log(res)
    })
  }
  render() { 
    return (  
      <div>
        <a href="http://southasiawatch.tw/feed/">RSS订阅</a>
      </div>
    );
  }
}

export default Community;