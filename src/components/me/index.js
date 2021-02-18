import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { TRUN_ZERO } from '../../store/constants'
import { setCollectionsCount } from '../../store/actions'
import './me.less'

class Me extends Component {
  constructor() {
    super()
    this.onTrueZero = this.onTrueZero.bind(this)
  }
  componentDidMount() {
    this.props.handleSetCollectionsCount(this.props.userInfo.id)
  }
  // 给创作新主题绑定点击事件
  handlerMeCreate () {
    this.props.history.push('/new')
  }
  onTrueZero () {
    this.props.turnZero()
  }
  render () {
    const createNewStyles = { paddingLeft: '10px', color: '#778087' }
    return (
      <div className='box' id='me_compo'>
        <div className='cell'>
          <table className='me'>
            <tbody>
              <tr>
                <td width='48'>
                  <div className='avatar'>
                    {
                      this.props.loginState === 1 ?
                        (
                          <Link to={`/member/${this.props.userInfo.nickname}`}>
                            <img alt='avatar' src={this.props.avatarUrl} />
                          </Link>
                        ) :
                        null
                    }
                  </div>
                </td>
                <td width='10'></td>
                <td>
                  <span>
                    {
                      this.props.userInfo.nickname
                    }
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <div className='sep10'></div>
          <table>
            <tbody>
              <tr>
                <td width='50%'>
                  <Link to='/collection/theme'>
                    <p>{this.props.userInfo.clc}</p>
                    <p>主题收藏</p>
                  </Link>
                </td>
                <td width='50%'>
                  <Link to='/collection/following'>
                    <p>0</p>
                    <p>特别关注</p>
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='cell' id='me_create'>
          <table>
            <tbody>
              <tr>
                <td>
                  <img alt='' width='28' height='28' src={require('../../static/hp_notepad2_pencil.png')}></img>
                </td>
                <td style={createNewStyles} onClick={(e) => this.handlerMeCreate(e)}>
                  <span>开始创作！</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='cell'>
          <Link onClick={this.onTrueZero} className='notification' to='/notifications'>
            {this.props.newNofiCount || 0}&nbsp;条未读提醒
            {
              this.props.newNofiCount > 0 ?
                <div className='new'>有新消息!</div>
                :
                null
            }
          </Link>
        </div>
      </div>
    );
  }
}

const mapStates = state => {
  return {
    avatarUrl: state.avatarUrl,
    loginState: state.loginState,
    userInfo: state.userInfo,
    newNofiCount: state.newNofiCount
  }
}

const mapDispatch = dispatch => {
  return {
    turnZero: () => {
      dispatch({ type: TRUN_ZERO })
    },
    handleSetCollectionsCount: (args) => {
      dispatch(setCollectionsCount(args))
    }
  }
}

export default connect(mapStates, mapDispatch)(Me);