import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { BASE_URL } from '../../base'
import axios from 'axios'
import Tui from './tui'
import './member.less'

class Member extends Component {
  constructor() {
    super()
    this.state = {
      memberInfo: {}
    }
    this.getMemberInfo = this.getMemberInfo.bind(this)
  }
  componentDidMount () {
    this.getMemberInfo()
  }
  async getMemberInfo () {
    const nickname = this.props.match.params.nickname
    await axios.get(`${BASE_URL}/api/v2/member/${nickname}`)
      .then(res => {
        const data = res.data
        this.setState({
          memberInfo: data.memberInfo
        })
      })
  }
  render () {
    const {
      id,
      nickname,
      createdAt,
      avatar
    } = this.state.memberInfo
    const BtnGroup = () => {
      return (
        <div className='btnGroup'>
          <button>发私信</button>
          <button>关注</button>
        </div>
      )
    }
    return (
      <>
        <div id='rightBar' className='me_rightBar'>
          <Tui />
        </div>
        <div id='Main' className='me_main'>
          <div className='box'>
            <div className='cell'>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <img width='66' height='66' src={avatar} alt="" />
                    </td>
                    <td>
                      <h1>{nickname}</h1>
                      <p>No. {id}&nbsp;&nbsp;&nbsp;&nbsp;加入于{createdAt}</p>
                      {
                        this.props.userInfo.nickname === this.props.match.params.nickname ?
                          null :
                          <BtnGroup />
                      }
                    </td>
                  </tr>
                </tbody>
              </table>
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
    userInfo: state.userInfo
  }
}

export default withRouter(connect(mapState)(Member));