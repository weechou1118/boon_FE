import React, { Component, createRef } from 'react';
import { initNotiAction, sendMessage } from '../../store/actions'
import { connect } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import io from 'socket.io-client'
import { BASE_URL } from '../../base'
import './chat.less'
import axios from 'axios';

class Chat extends Component {
  constructor() {
    super()
    this.state = {
      list: [],
      socket: null,
      followList: [],
      active: false,
      active_who_title: '',
      active_who_avatar: '',
      activeCase: null,
      chatList: []
    }
    this.getFollowList = this.getFollowList.bind(this)
    this.setActiveWho = this.setActiveWho.bind(this)
    this.getMessagesList = this.getMessagesList.bind(this)
    this.onKeyDownchange = this.onKeyDownchange.bind(this)
    this.editor = createRef()
    this.messageArea = createRef()
  }
  componentDidMount () {
    this.contentWs()
    this.getFollowList()
  }
  componentDidUpdate() {
    this.messageArea.scrollTop = this.messageArea.scrollHeight
  }
  contentWs () {
    this.setState({
      socket: io('ws://localhost:3001', {
        query: {
          'from': this.props.userInfo.nickname
        },
        auth: {
          'Authorization': this.props.token
        }
      })
    })
    setTimeout(() => {
      this.props.onNotiAction(this.state.socket, (data) => {
        const chatList = this.state.chatList.concat()
        chatList.push(data)
        this.setState({
          chatList
        })
      })

      // 监听是否成功发送到服务端
      this.state.socket.on(this.state.socket.id, () => {
        const fake = this.state.chatList.concat()
        const message = {
          id: uuidv4(),
          sender_uid: this.props.userInfo.nickname,
          receiver_uid: window.location.pathname.split('/').pop(),
          content: this.editor.innerText
        }
        fake.push(message)
        this.setState({
          chatList: fake
        })
        axios.post(`${BASE_URL}/api/v2/message`, {
          message
        })
          .then(res => {
          })
      })
    }, 100);
  }
  getFollowList () {
    axios.get(`${BASE_URL}/api/v2/follow`, {
      headers: {
        'Authorization': 'Basic ' + this.props.token
      }
    })
      .then(res => {
        this.setState({
          followList: res.data.data
        })
      })
  }
  contentChange (e) {
    this.setState({
      content: e.target.value
    })
  }
  setActiveWho (e, i, to) {
    e.target.closest('li').classList.add('active')
    const active_who_avatar = e.target.closest('li').querySelector('img').src
    const active_who_title = e.target.closest('li').querySelector('.who').innerText
    this.props.history.push(`/chat/${active_who_title}`)
    this.setState({
      active_who_title,
      active_who_avatar,
      active: true,
      activeCase: i
    })
    this.getMessagesList(active_who_title)
  }
  getMessagesList (args) {
    axios.get(`${BASE_URL}/api/v2/message`, {
      params: {
        from: this.props.userInfo.nickname,
        to: args
      }
    })
      .then(res => {
        const data = res.data.messages
        this.setState({
          chatList: data
        })
      })
  }
  async onSendMessage () {
    await this.props.onSendMessage(this.state.socket, { id: uuidv4(), from: this.props.userInfo.nickname, content: this.editor.innerText, to: window.location.pathname.split('/').pop() })
    setTimeout(() => {
      this.editor.innerText = ''
    }, 100);
  }
  onKeyDownchange(e) {
    if (e.keyCode === 13) {
      this.onSendMessage()
    }
  }
  render () {
    return (
      <>
        <div>
          <div className='chatWrapper'>
            <div className='chatList'>
              <div className='title'><span>近期消息</span></div>
              <ul>
                {
                  this.state.followList.map((item, i) => (
                    <li className={this.state.activeCase === i ? 'active' : null} key={uuidv4()} onClick={(e) => this.setActiveWho(e, i, item.to)}>
                      <div><img width='' src={item.to_avatar} alt="" /></div>
                      <div className='who'>{item.to_nickname}</div>
                    </li>
                  ))
                }
              </ul>
            </div>
            <div className='chatArea' ref={(chatArea) => { this.chatArea = chatArea }}>
              <div className='chatBox'>
                {
                  this.state.active ?
                    <div className='nickname_title'>
                      {this.state.active_who_title}
                    </div>
                    :
                    null
                }
                <div className='messageArea' ref={div => this.messageArea = div}>
                  {
                    this.state.active ?
                      this.state.chatList.map(item => {
                        return (
                          <div key={uuidv4()} className={item.sender_uid === this.props.userInfo.nickname ? 'isMe aMessage' : 'aMessage'}>
                            <img src={item.sender_uid === this.props.userInfo.nickname ? this.props.avatarUrl : this.state.active_who_avatar} alt="" />
                            <div className='contentBox'>
                              {item.content}
                            </div>
                          </div>
                        )
                      })
                      :
                      null
                  }
                </div>
              </div>
              <div onKeyDown={e => this.onKeyDownchange(e)} ref={div => this.editor = div} contentEditable='true' id='editor'></div>
              <div className='right row'>
                <button className='sendBtn' onClick={() => this.onSendMessage()}>发送</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapState = state => {
  return {
    avatarUrl: state.avatarUrl,
    token: state.token,
    userInfo: state.userInfo,
    chatList: state.chatList
  }
}
const mapDispatch = dispatch => {
  return {
    onNotiAction: (socket, args) => {
      dispatch(initNotiAction(socket, args))
    },
    onSendMessage: (socket, args) => {
      dispatch(sendMessage(socket, args))
    }
  }
}

export default connect(mapState, mapDispatch)(Chat)