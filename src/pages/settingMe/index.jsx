import React, { Component } from 'react';
import './setttingMe.less'
import Me from '../../components/me'
import MySetting from '../../components/mySetting'

class settingMe extends Component {
  render() { 
    return (
      <>
        <div id='rightBar'>
            <Me/>
        </div>
        <MySetting {...this.props}/>
      </>
    );
  }
}
 
export default settingMe