import React, { Component, Fragment } from 'react';
import axios from 'axios'
import {BASE_URL} from '../../base'
import LoadingBox from '../loadingBox'
import './detail.less'

class MainDetail extends Component {
  constructor() {
    super()
    this.state = {
      article: {
        author: {}
      },
      isLoading: true
    }
  }
  componentDidMount() {
    const {match} = this.props
    axios.get(`${BASE_URL}/api/v2/article/` + match.params.id, {})
    .then(res => {
        this.setState({
          article: res.data,
          isLoading: false
        })
    })
  }
  render() { 
    const {title, content, createdAt, author} = this.state.article
    return (  
      <div className='box'>
        {
            this.state.isLoading?
            <LoadingBox styles={{'height': '200px'}}/>
            :
            <>
            <header>
                <Fragment>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <picture className='avatar_box'>
                            <img src={author.avatar} width='32' alt='avatar' />
                          </picture>
                        </td>
                        <td>
                          <a href='/'><strong className='author'>{author.nickname}</strong></a>
                          <i className='levelTag'>Lv{author.level}</i>
                          <br />
                          <span className='createdTime'>{createdAt.split('T')[0]}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  
                  <h1>{title}</h1>
                </Fragment>
            </header>
            <div className='articleBody' dangerouslySetInnerHTML={{__html: content}}></div>
            </>
          }
      </div>
    );
  }
}

export default MainDetail;