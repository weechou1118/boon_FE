import React, { Component } from 'react';
import { connect } from 'react-redux'
import './me.less'

class Me extends Component {
  render() { 
    return (  
      <div className='box'>
        <div className='cell'>
          <table className='me'>
            <tbody>
              <tr>
                <td width='48'>
                  <div className='avatar'></div>
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
          <div style={{height: '10px'}}></div>
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
        <div className='cell'>
          <table>
            <tbody>
              <tr>
                <td>
                  <img alt='' width='28' height='28' src='https://www.v2ex.com/static/img/essentials/compose.png?v=b9e1f045f4ad639733bf9f6dbc62ed4c'></img>
                </td>
                <td style={{paddingLeft: '10px', color: '#778087'}}>
                  <span>创作新主题</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='cell'>
          <span style={{color: '#778087'}}>0&nbsp;条未读提醒</span>
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
    userInfo: state.userInfo
  }
}
 
export default connect(mapStates, )(Me);