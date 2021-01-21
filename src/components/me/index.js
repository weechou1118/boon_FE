import React, { Component } from 'react';
import { connect } from 'react-redux'
import './me.less'

class Me extends Component {
  componentDidMount() {
    this.handlerMeCreate()
  }
  // 给创作新主题绑定点击事件
  handlerMeCreate() {
    let p = this.props
    document.querySelector('#me_create').addEventListener('click', function(e) {
      p.history.push('/new')
    })
  }
  render() { 
    const color = {color: '#778087'}
    const createNewStyles = {paddingLeft: '10px', color: '#778087'}
    return (  
      <div className='box' id='me_compo'>
        <div className='cell'>
          <table className='me'>
            <tbody>
              <tr>
                <td width='48'>
                  <div className='avatar'>
                    {
                      this.props.loginState === 1?
                      (
                        <img alt='avatar' src={this.props.avatarUrl} />
                      ):
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
                <td width='33%'>
                  <p>0</p>
                  <p>节点收藏</p>
                </td>
                <td width='33%'>
                  <p>0</p>
                  <p>主题收藏</p>
                </td>
                <td width='33%'>
                  <p>0</p>
                  <p>特别关注</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* <div className='cell' id='lineWrapper'>
          <div className='line'>
            <div></div>
          </div>
        </div> */}
        <div className='cell' id='me_create'>
          <table>
            <tbody>
              <tr>
                <td>
                  <img alt='' width='28' height='28' src='https://www.v2ex.com/static/img/essentials/compose.png?v=b9e1f045f4ad639733bf9f6dbc62ed4c'></img>
                </td>
                <td style={createNewStyles}>
                  <span>创作新主题</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='cell'>
          <span style={color}>0&nbsp;条未读提醒</span>
          <div className='money'>
            20&nbsp;
            <img alt='' width='16' height='16' src='https://www.v2ex.com/static/img/silver@2x.png' />
            11&nbsp;
            <img alt='' width='16' height='16' src='https://www.v2ex.com/static/img/bronze@2x.png' />
          </div>
        </div>
      </div>
    );
  }
}

const mapStates = state => {
  return {
    avatarUrl: state.avatarUrl,
    loginState: state.loginState,
    userInfo: state.userInfo
  }
}
 
export default connect(mapStates, )(Me);