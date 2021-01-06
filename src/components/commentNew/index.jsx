import React, { Component } from 'react';
import axios from 'axios'
import {BASE_URL} from '../../base'
import {connect} from 'react-redux'
import {Button} from 'antd'
import './commentNew.less'

class CommentNew extends Component {
  constructor() {
    super()
    this.verifyForm = this.verifyForm.bind(this)
    this.state = {}
  }
  verifyForm(e) {
    e.preventDefault() 
    const inside = {}
    const form = document.querySelector('#replyBox')
    let formData = new FormData(form)
    let re = /@.+\s/i
    let match = formData.get('content').match(re)
    if(match!=null) {
      formData.append('to_nickname', match[0].split(/[@\s]/)[1])
      formData.set('content',formData.get('content').split(' ').slice(1).join())
    }
    formData.forEach((value, key) => {
      inside[key] = value
    })
    axios.post(`${BASE_URL}/api/v2/comment/new`, {...inside},{
      // headers: {
      //   'Content-Type': 'multipart/form-data'
      // }
    })
    .then(res => {
      const data = res.data
      if(data.code===200) {
        console.log(data)
        window.location.reload()
      }
    })
  }
  render() { 
    return (  
      <div className='box'>
        <div className='cell'>添加新回复</div>
        <div className='cell'>
          <form id='replyBox' onSubmit={(e) => this.verifyForm(e)}>
            <input readOnly type="text" name='from_uid' value={this.props.uId} style={{'display': 'none'}}/>
            <input readOnly type="text" name='arId' value={this.props.match.params.id} style={{'display': 'none'}}/>
            <textarea autoComplete='false' name="content" id="replyArea" cols="30" rows="10"></textarea>
            <Button htmlType='submit' className='submitBtn'>回复</Button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStates = state => {
  return {
    uId: state.userInfo.id
  }
}
 
export default connect(mapStates)(CommentNew);