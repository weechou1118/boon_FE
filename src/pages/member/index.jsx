import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setFollowCount } from '../../store/actions'
import { BASE_URL } from '../../base'
import axios from 'axios'
import Tui from './tui'
import './member.less'

class Member extends Component {
  constructor() {
    super()
    this.state = {
      memberInfo: {},
      loading: true
    }
    this.getMemberInfo = this.getMemberInfo.bind(this)
    this.fetchFollow = this.fetchFollow.bind(this)
  }
  componentDidMount () {
    this.getMemberInfo()
  }
  fetchFollow () {
    axios.post(`${BASE_URL}/api/v2/follow`, {
      to: this.state.memberInfo.id
    }, {
      headers: {
        'Authorization': 'Basic ' + this.props.token
      }
    })
      .then(res => {
        if (res.data.code === 200) {
          this.props.setFollowCount(this.props.userInfo.id)
          // 迷之Bug, 不加定时器无法改变全局state
          setTimeout(() => {
            window.location.reload()
          }, 100);
        }
      })
  }
  async getMemberInfo () {
    const nickname = this.props.match.params.nickname
    await axios.get(`${BASE_URL}/api/v2/member/${nickname}`, {
      params: {
        uId: this.props.userInfo.id
      }
    })
      .then(res => {
        const data = res.data
        this.setState({
          memberInfo: data.memberInfo,
          loading: false
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
          {
            !this.state.loading?
            <button onClick={() => this.fetchFollow()}>{this.state.memberInfo.following ? '取消关注' : '关注'}</button>
            :
            null
          }
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
    userInfo: state.userInfo,
    token: state.token
  }
}

const mapDispatch = dispatch => {
  return {
    setFollowCount (uId) {
      dispatch(setFollowCount(uId))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Member));