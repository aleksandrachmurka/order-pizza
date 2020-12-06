import { actionTypes } from '../actions/authentication'

const initialState = {
  token: null,
  userId: '',
  error: null,
  loading: false,
  authRedirectPath: '/',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: action.idToken,
        userId: action.localId,
        loading: false,
      }
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      }
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null,
      }
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return {
        ...state,
        authRedirectPath: action.path,
      }
    default:
      return state
  }
}

export default reducer
