/*
 * @Description: 
 * @Version: 1.0
 * @Autor: zhou wei
 * @Date: 2020-09-25 16:15:18
 * @LastEditors: zhou wei
 * @LastEditTime: 2021-02-02 17:38:45
 */
import {
  SET_CHAT_MESSAGE
} from '../store/constants'
import io from 'socket.io-client'

const socket = io('ws://localhost:3001')
export const initNotiAction = (args) => {
  return dispatch => {
    socket.on('init', data => {
      console.log(data)
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