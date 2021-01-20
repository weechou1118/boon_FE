import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BASE_URL } from '../../../base'
import { SET_AVATAR } from '../../../store/constants'
import axios from 'axios'
import './avatar.less'

// axios请求头
axios.defaults.headers.post['Content-Type']='multipart/form-data;charset=UTF-8';

class Avatar extends Component {
  constructor() {
    super()
    this.formVerify = this.formVerify.bind(this)
  }
  componentDidMount() {
    console.log(this.props.userInfo)
  }
  formVerify(e) {
    e.preventDefault()
    const params = new FormData()
    const fileData = document.querySelector('#File').files[0]
    if (!fileData) {
      alert('请选择一张图片')
      return
    }
    params.append('file', fileData)
    params.append('name', 'avatar_' + this.props.userInfo.nickname)
    params.append('uId', this.props.userInfo.id)
    
    axios.post(`${BASE_URL}/api/v2/upload`, params, {
      transformRequest:[function(){
        return params
      }]
    })
    .then(res => {
      const data = res.data
      if (data.code === 200) {
        alert('上传成功!')
        const id = this.props.userInfo.id
        return axios.get(`${BASE_URL}/api/v2/user/refresh`, {
          params: {
            id
          }
        })
      }
    })
    .catch(error => {
      console.log(error)
      alert('文件传输异常')
    })
    .then(res => {
      const data = res.data
      console.log(data)
      if (data) {
        this.props.setAvatar(data.avatarUrl)
      }
    })
  }
  render() { 
    return ( 
      <form method='POST' onSubmit={(e)=>this.formVerify(e)} id='avatarForm'>
        <table>
          <tbody>
          <tr>
            <td>当前头像:</td>
            <td><img width='48' height='48' alt='' src={this.props.avatarUrl}/></td>
          </tr>
          <tr>
            <td>选择一个图片文件:</td>
            <td><input accept='image/x-png,image/gif,image/jpeg,image/bmp' name='file' type="file" id='File'/></td>
          </tr>
          <tr>
            <td></td>
            <td style={{'color': '#999999'}}>仅支持 2MB 以内的 PNG / JPG / GIF 图片文件</td>
          </tr>
          <tr>
            <td></td>
            <td><button type='submit'>开始上传</button></td>
          </tr>
          </tbody>
        </table>
      </form> 
    );
  }
}

const mapState = state => {
  return {
    userInfo: state.userInfo,
    avatarUrl: state.avatarUrl
  }
}

const mapDispatchs = dispatch => {
  return {
    setAvatar(avatarUrl) {
      dispatch({type: SET_AVATAR, avatarUrl})
    }
  }
}

export default connect(mapState, mapDispatchs)(Avatar);