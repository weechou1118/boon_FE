/*
 * @Description: 
 * @Version: 1.0
 * @Autor: zhou wei
 * @Date: 2020-09-25 15:59:19
 * @LastEditors: zhou wei
 * @LastEditTime: 2021-02-22 15:29:12
 */

import * as constants from './constants'

const defaultState = {
  loginState: 0,
  token: '',
  avatarUrl: 'https://s1.ax1x.com/2020/10/16/0b9dYR.jpg',
  newNofiCount: 0,
  chatList: {
    'aToB': [{id: 123, from: 'someone', content: 'asd'}]
  },
  userInfo: {
    id: '',
    uId: '',
    nickname: '',
    loginTime: '',
    level: 0,
    clc: 0,
    foc: 0
  },
}

export default (state = defaultState, action) => {
  // ns -> newState
  const ns = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case constants.LOGIN_IN:
      ns.loginState = 1
      ns.token = action.token
      return ns
    case constants.LOGIN_OUT:
      ns.loginState = 0
      return ns
    case constants.SET_TOKEN:
      ns.token = action.token
      return ns
    case constants.RESET_USER_STATE:
      ns.loginState = 0
      ns.token = action.token
      return ns
    case constants.SET_USER_INFO:
      ns.userInfo = action.userInfo
      return ns
    case constants.REGISTER_SUCC:
      ns.userInfo.level = action.level
      ns.loginState = 1
      return ns
    case constants.SET_AVATAR:
      ns.avatarUrl = action.avatarUrl
      return ns
    case constants.SET_NOTI:
      ns.newNofiCount += action.counts
      return ns
    case constants.TRUN_ZERO:
      ns.newNofiCount = 0
      return ns
    case constants.SET_CHAT_MESSAGE:
      ns.chatList['aToB'].push(action.msgData)
      return ns
    case constants.SET_COL_COUNT:
      ns.userInfo.clc = action.data.clc
      return ns
    case constants.SET_FO_COUNT:
      ns.userInfo.foc = action.data.foc
      return ns
    default:
      return state
  }
}