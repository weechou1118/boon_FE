import * as constants from './constants'

const defaultState = {
  loginState: 0
}

export default (state = defaultState, action) => {
  const newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case constants.LOGIN_IN:
      newState.loginState = 1
      return newState
    case constants.LOGIN_OUT:
      newState.loginState = 0
      return newState
    default:
      return state
  }
}