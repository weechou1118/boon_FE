import * as constants from './constants'

const defaultState = {
  loginState: 0,
  token: '',
  avatarUrl: 'https://s1.ax1x.com/2020/10/16/0b9dYR.jpg',
  userInfo: {
    id: '',
    uId: '',
    nickname: '',
    loginTime: '',
    level: 0    
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
    default:
      return state
  }
}