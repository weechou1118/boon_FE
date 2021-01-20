import React, { Component } from 'react';
import {UnControlled as CodeMirror} from 'react-codemirror2'
import {Button, Dropdown, Menu} from 'antd'
import {DownOutlined, UserOutlined} from '@ant-design/icons'
import {connect} from 'react-redux'
import axios from 'axios'
import {BASE_URL} from '../../base'
import 'codemirror/lib/codemirror.css'
import 'codemirror/lib/codemirror.js'
import './new.less'

class New extends Component {
  constructor() {
    super()
    // 要提交的内容
    this.state = {
      themes: ['程序员', '前端', '后端'],
      data: {
        title: '',
        author: '',
        content: '',
        selectTheme: '',
      }
    }
    this.updateStateData = this.updateStateData.bind(this)
    this.formVerify = this.formVerify.bind(this)
    this.publish = this.publish.bind(this)
  }
  componentDidMount() {
    const data = this.state.data
    if (this.props.loginState !== 1) {
      this.props.history.push('/login?from=plzlogin')
    }
    data.author = this.props.userInfo.nickname
    data.uId = this.props.userInfo.uId
    data.id = this.props.userInfo.id
    this.setState({
      data
    })
    return
  }
  publish() {
    axios.post(`${BASE_URL}/api/v2/article/new`, {
      ...this.state.data
    }).then(res => {
      const data = res.data
      if(data.code !== 400) {
        alert('文章发布成功!')
        console.log(data)
        // this.props.history.push('/')
      }
    })
  }
  switchTheme({key}) {
    this.updateStateData('selectTheme', this.state.themes[key])
    this.themeNode.innerHTML = this.state.data.selectTheme
  }
  updateTitle(e) {
    let title = e.target.value
    this.updateStateData('title', title)
  }
  updateWordCount(editor, anothorData, content) {
   this.updateStateData('content', content)
  }
  updateTheme(e) {
    let selectTheme = e.target.value
    this.updateStateData('selectTheme', selectTheme)
  }
  formVerify(e) {
    e.preventDefault()
    const data = this.state.data
    for (let key in data) {
      if (!data[key]) {
        alert(`请将信息填写完整:${key}`)
        return
      }
    }
    this.publish()
  }
  updateStateData(key, value) {
    const data = this.state.data
    data[key] = value
    this.setState({
      data
    })
  }
  render() { 
    const menu = (
      <Menu onClick={this.switchTheme.bind(this)}>
      {
        this.state.themes.map((item, index) => (
          <Menu.Item key={index} icon={<UserOutlined />}>
            {item}
          </Menu.Item>
        ))
      }
      </Menu>
    )
    return (  
      <div className='articleArea'>
        <form onSubmit={this.formVerify}>
          <div className='cell'>标题: </div>
          <div><input onChange={(e) => this.updateTitle(e)} type='text' className='titleInput' placeholder='请在此输入标题'/></div>
          <div className='cell'>内容:</div>
          <div className='cell cm'>
            <CodeMirror
              ref={code=>this.codeMirror = code}
              value=''
              options={{
                lineNumbers: true,
                mode: {name: 'text/javascript'},
                autofocus: true,
                styleActiveLine: true,
                extraKeys: {'Ctrl': 'autocomplete'},
                smartIndent: true
              }}
              onChange={(editor, data, content) =>this.updateWordCount(editor, data, content)}
            ></CodeMirror>
          </div>
          <div className='cell'>
            主题: 
            <Dropdown trigger={['click']} overlay={menu}>
              <Button className='nodesButton'>
                <span ref={span=>this.themeNode = span}>请选择一个节点</span><DownOutlined />
              </Button>
            </Dropdown>
          </div>
          <div className='cell'><Button htmlType='submit'>发布文章</Button></div>
        </form>
      </div>
    );
  }
}
const mapState = state => {
  return {
    loginState: state.loginState,
    userInfo: state.userInfo
  }
}
 
export default connect(mapState)(New);