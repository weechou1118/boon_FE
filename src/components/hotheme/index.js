/*
 * @Description: 
 * @Version: 1.0
 * @Autor: zhou wei
 * @Date: 2020-09-29 10:56:17
 * @LastEditors: zhou wei
 * @LastEditTime: 2021-02-04 14:29:17
 */
import React, { Component } from 'react';
import { BASE_URL } from '../../base'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './hotheme.less'

class Hotheme extends Component {
  constructor() {
    super()
    this.state = {
      hotDiscussionList: []
    }
  }
  componentDidMount() {
    axios.get(`${BASE_URL}/api/v2/article/hotDiscussion`)
    .then(res => {
      const hotDiscussionList = res.data.data
      this.setState({
        hotDiscussionList
      })
    })
  }
  render() { 
    return (  
      <div className='box hot'>
        <div className='cell'>
          热议中~
        </div>
        {
          this.state.hotDiscussionList.map(item => (
            <div className='cell' key={item.arId}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <Link to={`/member/${item.author}`}>
                        <img width='40' height='40' alt='' src={item.avatar} />
                      </Link>
                    </td>
                    <td width='10'></td>
                    <td>
                      <Link to={`/article/${item.arId}`}>
                        <p>{item.title}</p>
                      </Link>
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