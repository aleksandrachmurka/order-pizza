import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { authActions } from '../store/actions/authentication'

class Logout extends Component {
  componentDidMount() {
    this.props.logoutHandler()
  }
  render() {
    return <Redirect to="/" />
  }
}

const mapDispatchToProps = (dispatch) => ({
  logoutHandler: () => dispatch(authActions.logout()),
})

export default connect(null, mapDispatchToProps)(Logout)
