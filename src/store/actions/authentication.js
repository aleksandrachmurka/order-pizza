import axios from 'axios'
import { AUTH_URLS } from '../../const/data'

export const actionTypes = {
  AUTH_START: 'AUTH_START',
  AUTH_SUCCESS: 'AUTH_SUCCESS',
  AUTH_FAIL: 'AUTH_FAIL',
  AUTH_LOGOUT: 'AUTH_LOGOUT',
  SET_AUTH_REDIRECT_PATH: 'SET_AUTH_REDIRECT_PATH',
}

const setAuthRedirectPath = (path) => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path,
})

const authStart = () => ({
  type: actionTypes.AUTH_START,
})

const authSuccess = (idToken, localId) => ({
  type: actionTypes.AUTH_SUCCESS,
  idToken,
  localId,
})

const authError = (error) => ({
  type: actionTypes.AUTH_FAIL,
  error,
})

const authenticate = (email, password, method) => {
  return (dispatch) => {
    dispatch(authStart())
    const data = {
      email,
      password,
      returnSecureToken: true,
    }

    const url = AUTH_URLS[method]

    axios
      .post(url, data)
      .then((res) => {
        const expirationDate = new Date(
          new Date().getTime() + res.data.expiresIn * 1000
        )
        localStorage.setItem('token', res.data.idToken)
        localStorage.setItem('expirationDate', expirationDate)
        localStorage.setItem('userId', res.data.localId)
        dispatch(authSuccess(res.dataidToken, res.date.localId))
        dispatch(checkAuthTimeOut(res.data.expiresIn))
      })
      .catch((error) => {
        console.log(error)
        dispatch(authError(error))
      })
  }
}

const checkAuthTimeOut = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout())
    }, expirationTime * 1000)
  }
}

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('expirationDate')
  localStorage.removeItem('userId')

  return {
    type: actionTypes.AUTH_LOGOUT,
  }
}

const checkAuth = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token')
    if (!token) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      if (expirationDate >= new Date()) {
        const userId = localStorage.getItem('userId')
        dispatch(authSuccess(token, userId))
        dispatch(
          checkAuthTimeOut(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        )
      }
    }
  }
}

export const authActions = {
  authenticate,
  logout,
  setAuthRedirectPath,
  checkAuth,
}
