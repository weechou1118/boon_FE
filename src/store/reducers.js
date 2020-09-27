import * as constants from './constants'

const defaultState = {
  loginState: 0,
  token: ''
}

export default (state = defaultState, action) => {
  const newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case constants.LOGIN_IN:
      newState.loginState = 1
      newState.token = action.token
      return newState
    case constants.LOGIN_OUT:
      newState.loginState = 0
      return newState
    case constants.SET_TOKEN:
      newState.token = action.token
      return newState
    case constants.RESET_USER_STATE:
      newState.loginState = 0
      newState.token = action.token
      return newState
    default:
      return state
  }
}