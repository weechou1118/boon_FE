import React, { Component } from 'react';
import './tui.less'

class Tui extends Component {
  render() { 
    return (  
      <div className='box'>
        <div className='cell item'>最近动态</div>
        <div className='cell'>content</div>
      </div>
    );
  }
}

export default Tui;