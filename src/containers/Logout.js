import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { authActions } from '../store/actions/authentication'

const Logout = ({ logoutHandler }) => {
  useEffect(() => {
    logoutHandler()
  }, [logoutHandler])

  return <Redirect to="/" />
}

const mapDispatchToProps = (dispatch) => ({
  logoutHandler: () => dispatch(authActions.logout()),
})

export default connect(null, mapDispatchToProps)(Logout)
