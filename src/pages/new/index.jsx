import React, { Component } from 'react';
import {UnControlled as CodeMirror} from 'react-codemirror2'
import {Button} from 'antd'
import axios from 'axios'
import 'codemirror/lib/codemirror.css'
import 'codemirror/lib/codemirror.js'

class New extends Component {
  constructor() {
    super()
    // 要提交的内容
    this.state = {
      title: '',
      author: '',
      content: ''
    }
  }
  publish() {
    axios.post('http://localhost:3001/api/v2/article/new', {

    }).then(res => {
      const data = res.data
      console.log(data)
    })
  }
  updateWordCount(editor, data, content) {
    this.setState({
      content
    })
  }
  render() { 
    return (  
      <div>
        <form>
          标题: <input type='text'/>
          <br/>
          内容:
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
          主题: <input type="text"/>
          <br />
          <Button onClick={this.publish.bind(this)}>发布文章</Button>
        </form>
      </div>
    );
  }
}
 
export default New;