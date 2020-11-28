import React, { Component } from 'react';
import {UnControlled as CodeMirror} from 'react-codemirror2'
import {Button, Dropdown, Menu} from 'antd'
import {DownOutlined, UserOutlined} from '@ant-design/icons'
import axios from 'axios'
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
        selectTheme: ''
      }
    }
  }
  publish() {
    axios.post('http://localhost:3001/api/v2/article/new', {
      ...this.state.data
    }).then(res => {
      const data = res.data
      console.log(data)
    })
  }
  switchTheme({key}) {
    this.setState({
      data: {
        selectTheme: this.state.themes[key]
      }
    })
  }
  updateWordCount(editor, data, content) {
    this.setState({
      content
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
        <form>
          <div className='cell'>标题: </div>
          <div><input type='text' className='titleInput' placeholder='请在此输入标题'/></div>
          <div className='cell'>内容:</div>
          <div className='cell cm'>
            <CodeMirror
              ref={code=>this.codeMirror = code}
              value='react-codemirror'
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
                请选择一个节点<DownOutlined />
              </Button>
            </Dropdown>
          </div>
          <div className='cell'><Button onClick={this.publish.bind(this)}>发布文章</Button></div>
        </form>
      </div>
    );
  }
}
 
export default New;