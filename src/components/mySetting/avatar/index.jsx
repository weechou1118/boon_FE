import React, { Component } from 'react';
import { connect } from 'react-redux'
import './avatar.less'

class Avatar extends Component {
  render() { 
    return ( 
      <form id='avatarForm'>
        <table>
          <tbody>
          <tr>
            <td>当前头像:</td>
            <td><img width='48' alt='' src={this.props.avatarUrl}/></td>
          </tr>
          <tr>
            <td>选择一个图片文件:</td>
            <td><input type="file"/></td>
          </tr>
          <tr>
            <td></td>
            <td><button>开始上传</button></td>
          </tr>
          </tbody>
        </table>
      </form> 
    );
  }
}

const mapState = state => {
  return {
    avatarUrl: state.avatarUrl
  }
}
 
export default connect(mapState)(Avatar);