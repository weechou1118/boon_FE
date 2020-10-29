import React, { Component } from 'react';
import './hotnode.less'

class Hotnode extends Component {
  render() { 
    return (  
      <div className='box'>
        <div className='cell'>
          最热节点
        </div>
        <div className='inner'>
          <a href='/'>微软飞行模拟</a>
          <a href='/'>PyGame</a>
          <a href='/'>微软飞行模拟</a>
          <a href='/'>PyGame</a>
          <a href='/'>微软飞行模拟</a>
          <a href='/'>PyGame</a>
          <a href='/'>微软飞行模拟</a>
          <a href='/'>PyGame</a>
          <a href='/'>微软飞行模拟</a>
          <a href='/'>PyGame</a>
        </div>
      </div>
    );
  }
}
 
export default Hotnode;