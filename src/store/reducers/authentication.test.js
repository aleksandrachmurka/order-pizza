import reducer from './authentication'
import { actionTypes } from '../actions/authentication'

describe('auth reducer', () => {
  const initialState = {
    token: null,
    userId: '',
    error: null,
    loading: false,
    authRedirectPath: '/',
  }

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })
  it('should store token when log in', () => {
    const action = {
      type: actionTypes.AUTH_SUCCESS,
      idToken: 'token',
      localId: 'test',
    }
    const result = {
      token: 'token',
      userId: 'test',
      error: null,
      loading: false,
      authRedirectPath: '/',
    }
    expect(reducer(initialState, action)).toEqual(result)
  })
})
