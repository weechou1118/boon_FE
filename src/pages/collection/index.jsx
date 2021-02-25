import React, { Component } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom'
import Themex from './themex'
import following from './following'
import Me from '../../components/me'
import './collection.less'

class Collection extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  
  render () {
    return (
      <>
        <div id='rightBar'>
          <Me />
        </div>
        <div id='Main' className='col_main'>
          <div className='box'>
            <div className='cell'>
              <h1>我的收藏</h1>
            </div>
          </div>
          <div className='box'>
            <div className='cell'>
              <NavLink activeClassName='active' to='/collection/theme'>主题</NavLink>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <NavLink activeClassName='active' to='/collection/following'>特别关注</NavLink>
            </div>
            <div className='cell'>
              <Switch>
                <Route path='/collection/theme' component={Themex}></Route>
                <Route path='/collection/following' component={following}></Route>
              </Switch>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Collection;