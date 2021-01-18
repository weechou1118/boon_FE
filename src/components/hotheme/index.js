import React, { Component } from 'react';
import './hotheme.less'

class Hotheme extends Component {
  render() { 
    return (  
      <div className='box hot'>
        <div className='cell'>
          作者推荐
        </div>
        {
          [1,2,3,4,5].map(item => (
            <div className='cell' key={item}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <img width='40' height='40' alt='' src='https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2857291761,603812366&fm=26&gp=0.jpg' />
                    </td>
                    <td width='10'></td>
                    <td>
                      <p>我是十三<i className='levelTag'>Lv3</i></p>
                      <p>高级开发工程师</p>
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