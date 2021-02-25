/*
 * @Description: 
 * @Version: 1.0
 * @Autor: zhou wei
 * @Date: 2020-09-25 16:15:18
 * @LastEditors: zhou wei
 * @LastEditTime: 2021-02-24 15:56:30
 */
import {
  SET_CHAT_MESSAGE,
  SET_COL_COUNT,
  SET_FO_COUNT
} from '../store/constants'
import {
  BASE_URL
} from '../base'
import axios from 'axios'

export const initNotiAction = (socket, cb) => {
  return dispatch => {
    socket.on('init', (data) => {
      cb(data)
      dispatch({
        type: SET_CHAT_MESSAGE,
        msgData: data.content
      })
    })
  }
}
export const sendMessage = (socket, args) => {
  return dispatch => {
    socket.send(args)
  }
}
export const setCollectionsCount = (uId) => {
  return dispatch => {
    axios.get(`${BASE_URL}/api/v2/user/atcount`, {
      params: {
        uId
      }
    })
      .then(res => {
        const data = res.data.data
        dispatch({
          type: SET_COL_COUNT,
          data
        })
      })
  }
}
export const setFollowCount = (uId) => {
  return dispatch => {
    axios.get(`${BASE_URL}/api/v2/user/focount`, {
      params: {
        uId
      }
    })
      .then(res => {
        const data = res.data.data
        dispatch({
          type: SET_FO_COUNT,
          data
        })
      })
  }
}