import React, { Component } from 'react';
import { initNotiAction, sendMessage } from '../../store/actions'
import { connect } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import './chat.less'

class Chat extends Component {
  constructor() {
    super()
    this.state = {
      content: '',
      list: []
    }
  }
  componentDidMount() {
    this.props.onNotiAction({
      id: this.props.userInfo.id,
      nickname:this.props.userInfo.nickname,
      msg: 'lalala'
    })
  }
  contentChange(e) {
    this.setState({
      content: e.target.value
    })
  }
  async onSendMessage() {
    await this.props.onSendMessage({id:uuidv4(),from: this.props.userInfo.nickname,content:this.state.content})
  }
  render() { 
    return ( 
      <>
        <h1>消息列表</h1>
        <div>
          <div className='chatWrapper'>
            <div className='chatArea' ref={(chatArea) => {this.chatArea = chatArea}}>
              {
                this.props.chatList.aToB.map(item => {
                  return (
                    <p key={uuidv4()}>{item.from}: {item.content}</p>
                  )
                })
              }
            </div>
            <hr />
            <input type="text" onChange={(e) => this.contentChange(e)}/>        
            <button onClick={()=>this.onSendMessage()}>发送</button>
          </div>
        </div>
      </>
    );
  }
}
const mapState = state => {
  return {
    userInfo: state.userInfo,
    chatList: state.chatList
  }
}
const mapDispatch = dispatch => {
  return {
    onNotiAction: (args) => {
      dispatch(initNotiAction(args))
    },
    onSendMessage: (args) => {
      dispatch(sendMessage(args))
    }
  }
}

export default connect(mapState, mapDispatch)(Chat)