import React, { Component } from 'react';
import axios from 'axios'
import {BASE_URL} from '../../base'
import {connect} from 'react-redux'
import {Button} from 'antd'
// import {getSelectionCoords} from '../../utils'
import getCaretCoordinates from 'textarea-caret'
import {insertText} from '../../utils'
import './commentNew.less'

class CommentNew extends Component {
  constructor() {
    super()
    this.verifyForm = this.verifyForm.bind(this)
    this.state = {
      userList: ['6fdqwdsaxc', 'c5', '(σ｀д′)σ']
    }
  }
  componentDidMount() {
    // 监听@
    document.querySelector('#replyArea').onkeydown = function(e) {
      const userListBox = document.querySelector('.userListWhenAt')
      let initNode = userListBox.querySelector('li:first-child')
      let activeNode;
      if(document.activeElement===this) {
        if (e.key === '@') {
          const caret = getCaretCoordinates(this, this.selectionEnd)
          userListBox.style.display = 'block'
          userListBox.style.left = caret.left + 50 + 'px'
          userListBox.style.top = caret.top + 90 + 'px'
          initNode.classList.add('active')
        }
        if (e.key === 'ArrowUp'||e.key === 'ArrowDown') {
          // 阻止浏览器默认行为 防止光标移动
          e.preventDefault()
          switchActive(e.key)
        }
        if(e.key === 'Backspace') {
          userListBox.style.display = 'none'
          userListBox.querySelectorAll('li').forEach(item => {
            item.classList.remove('active')
          })
        }
        if (e.key === 'Enter'&&userListBox.style.display ==='block') {
          e.preventDefault()
          let text = userListBox.querySelector('li.active').innerHTML
          insertText(this, text)
          userListBox.style.display = 'none'
        }
        function switchActive(key) {
          activeNode = userListBox.querySelector('li.active')
          activeNode.classList.remove('active')
          if (key === 'ArrowUp') {
            activeNode = activeNode.previousSibling
            if (!activeNode) {
              activeNode = userListBox.querySelector('li:last-child')
            }
          } else if (key ==='ArrowDown') {
            activeNode = activeNode.nextSibling
            if (!activeNode) {
              activeNode = initNode
            }
          }
          activeNode.classList.add('active')
        }
      }
     
    }
    
  }
  verifyForm(e) {
    e.preventDefault() 
    const inside = {}
    const form = document.querySelector('#replyBox')
    let formData = new FormData(form)
    let re = /@.+\s/i
    if (!formData.get('content')) {
      alert('请说点什么')
      form.querySelector('textArea').focus()
      return
    }
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
        alert('回复成功')
        window.location.reload()
      }
    })
  }
  render() { 
    const styles = {'display': 'none'}
    return (  
      <div className='box'>
        <ul className='userListWhenAt'>
          {
            this.state.userList.map(item => {
              return (
                <li key={item}>{item}</li>
              )
            })
          }
        </ul>
        <div className='cell' style={{'fontSize': '20px','paddingBottom': '5px'}}>评论</div>
        <div className='cell'>
          <form id='replyBox' onSubmit={(e) => this.verifyForm(e)}>
            <input readOnly type="text" name='from_uid' value={this.props.uId} style={styles}/>
            <input readOnly type="text" name='arId' value={this.props.match.params.id} style={styles}/>
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