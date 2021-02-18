/*
 * @Description: 
 * @Version: 1.0
 * @Autor: zhou wei
 * @Date: 2020-09-25 16:15:18
 * @LastEditors: zhou wei
 * @LastEditTime: 2021-02-18 15:02:54
 */
import {
  SET_CHAT_MESSAGE,
  SET_COL_COUNT
} from '../store/constants'
import {
  BASE_URL
} from '../base'
import axios from 'axios'
import io from 'socket.io-client'

const socket = io('ws://localhost:3001')
export const initNotiAction = (args) => {
  return dispatch => {
    socket.on('init', data => {
      dispatch({
        type: SET_CHAT_MESSAGE,
        msgData: data.content
      })
    })
  }
}
export const sendMessage = (args) => {
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