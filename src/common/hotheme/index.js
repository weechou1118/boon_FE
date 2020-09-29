import React, { Component } from 'react';
import './hotheme.less'

class Hotheme extends Component {
  render() { 
    return (  
      <div className='box hot'>
        <div className='cell'>
          今日热议主题
        </div>
        {
          [1,2,3,4,5].map(item => (
            <div className='cell' key={item}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <img width='24' height='24' alt='' src='https://cdn.v2ex.com/avatar/3de4/3aeb/231862_normal.png?m=1567578273' />
                    </td>
                    <td width='10'></td>
                    <td>
                      [送码] GeText & JSON2Model for macOS.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))
        }
      </div>
    );
  }
}
 
export default Hotheme;