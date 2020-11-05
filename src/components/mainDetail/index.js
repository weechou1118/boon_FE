import React, { Component } from 'react';
import axios from 'axios'

class MainDetail extends Component {
  constructor() {
    super()
    this.state = {
      article: {}
    }
  }
  componentDidMount() {
    const {match} = this.props
    axios.get('http://localhost:3001/api/v2/article/' + match.params.id, {})
    .then(res => {
      this.setState({
        article: res.data
      })
    })
  }
  render() { 
    const {title, content} = this.state.article
    return (  
      <div className='container'>
        <h1>{title}</h1>
        <div className='articleBody' dangerouslySetInnerHTML={{__html: content}}></div>
      </div>
    );
  }
}
 
export default MainDetail;