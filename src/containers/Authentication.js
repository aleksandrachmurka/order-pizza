import React, { Component } from 'react'
import { connect } from 'react-redux'
import { authActions } from '../store/actions/authentication'
import { Redirect } from 'react-router-dom'
import Button from '../components/Button/Button'
import Input from '../components/Input/Input'
import Spinner from '../components/Spinner/Spinner'
import styles from './Authentication.module.css'

class Authentication extends Component {
  state = {
    authForm: {
      email: {
        type: 'email',
        placeholder: 'Your email',
        value: '',
        required: true,
        valid: false,
        touched: false,
      },
      password: {
        type: 'password',
        placeholder: 'Password',
        value: '',
        required: true,
        minLength: 6,
        valid: false,
        touched: false,
      },
    },
    isFormValid: false,
    isSignUp: true,
  }

  componentDidMount() {
    if (!this.props.choosing && this.props.authRedirectPath !== '/') {
      this.props.setRedirectPathHandler()
    }
  }

  createForm = () => {
    const elementsArray = []
    for (const key in this.state.authForm) {
      elementsArray.push({
        id: key,
        key: key,
        ...this.state.authForm[key],
      })
    }
    return elementsArray.map((element) => (
      <Input {...element} onChange={this.changeHandler} />
    ))
  }

  changeHandler = (event) => {
    const updatedElement = {
      ...this.state.authForm[event.target.id],
      value: event.target.value,
    }

    updatedElement.touched = true
    updatedElement.valid = this.validate(updatedElement)

    const updatedAuthForm = {
      ...this.state.authForm,
      [event.target.id]: updatedElement,
    }

    const updatedIsFormValid = this.validateForm(updatedAuthForm)

    this.setState({
      authForm: updatedAuthForm,
      isFormValid: updatedIsFormValid,
    })
  }

  validate = (element) => {
    if (!element.touched) return
    if (element.minLength) {
      return element.value.length >= element.minLength
    }
    if (element.required) {
      return element.value.trim() !== ''
    }
  }

  validateForm = (form) => {
    const entries = Object.entries(form)
    for (const entry of entries) {
      if (!entry[1].valid) {
        return false
      }
    }

    return true
  }

  changeHandler = (event) => {
    const updatedElement = {
      ...this.state.authForm[event.target.id],
      value: event.target.value,
    }

    updatedElement.touched = true
    updatedElement.valid = this.validate(updatedElement)

    const updatedAuthForm = {
      ...this.state.authForm,
      [event.target.id]: updatedElement,
    }

    const updatedIsFormValid = this.validateForm(updatedAuthForm)

    this.setState({
      authForm: updatedAuthForm,
      isFormValid: updatedIsFormValid,
    })
  }

  submitHandler = (event) => {
    event.preventDefault()
    const { email, password } = this.state.authForm
    const method = this.state.isSignUp ? 'signUp' : 'signIn'
    this.props.authHandler(email.value, password.value, method)
  }

  switchAuthModeHandler = () => {
    this.setState((prevState) => ({ isSignUp: !prevState.isSignUp }))
  }

  render() {
    return (
      <>
        {this.props.isAuthenticated && (
          <Redirect to={this.props.authRedirectPath} />
        )}
        {this.props.error && <p>{this.props.error.message}</p>}
        {this.props.loading ? (
          <Spinner />
        ) : (
          <div className={styles.auth}>
            <form onSubmit={this.submitHandler}>
              {this.createForm()}
              <Button type="success" disabled={!this.state.isFormValid}>
                {this.state.isSignUp ? 'SIGN UP' : 'SIGN IN'}
              </Button>
            </form>
            <Button type="danger" onClick={this.switchAuthModeHandler}>
              SWITCH TO {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}
            </Button>
          </div>
        )}
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  loading: state.authentication.loading,
  error: state.authentication.error,
  isAuthenticated: state.authentication.token !== null,
  choosing: state.pizza.choosing,
  authRedirectPath: state.authentication.authRedirectPath,
})

const mapDispatchToProps = (dispatch) => ({
  authHandler: (email, password, method) =>
    dispatch(authActions.authenticate(email, password, method)),
  setRedirectPathHandler: () => dispatch(authActions.setAuthRedirectPath('/')),
})

export default connect(mapStateToProps, mapDispatchToProps)(Authentication)
