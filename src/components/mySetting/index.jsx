import React, { Component } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import Profile from './profile'
import Avatar from './avatar'
import './mySetting.less'

class mySetting extends Component {
  componentDidMount() {
    this.props.history.push({
      userInfo: this.props.userInfo,
      avatarUrl: this.props.avatarUrl
    })
  }
  render() { 
    return (  
      <div id='settingMain'>
        <div className='box' id='setting'>
          <div className='cell'>设置</div>
          <div className='cell nav'>
              <NavLink to='/settingMe/profile'>个人主页</NavLink>
              <NavLink to='/settingMe/avatar'>头像</NavLink>
          </div>
          <div className='cell'>
              <Switch>
                <Route exact path='/settingMe' component={Profile}></Route>
                <Route path={`${this.props.match.path}/avatar`} component={Avatar}></Route>
                <Route path={`${this.props.match.path}/profile`} component={Profile}></Route>
              </Switch>
          </div>
        </div>
      </div>
    );
  }
}
const mapState = state => {
  return {
    userInfo: state.userInfo,
    avatarUrl: state.avatarUrl
  }
}
 
 
export default connect(mapState)(mySetting);