import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { authActions } from '../store/actions/authentication'
import { Redirect } from 'react-router-dom'
import Button from '../components/Button/Button'
import Input from '../components/Input/Input'
import Spinner from '../components/Spinner/Spinner'
import styles from './Authentication.module.css'

const authFormConfig = {
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
}

const Authentication = (props) => {
  const { choosing, authRedirectPath, setRedirectPathHandler } = props
  const [authForm, setAuthForm] = useState(authFormConfig)
  const [isFormValid, setIsFormValid] = useState(false)
  const [isSignUp, setIsSignUp] = useState(true)

  useEffect(() => {
    if (!choosing && authRedirectPath !== '/') {
      setRedirectPathHandler()
    }
  }, [choosing, authRedirectPath, setRedirectPathHandler])

  const createForm = () => {
    const elementsArray = []
    for (const key in authForm) {
      elementsArray.push({
        id: key,
        key: key,
        ...authForm[key],
      })
    }
    return elementsArray.map((element) => (
      <Input {...element} onChange={changeHandler} />
    ))
  }

  const changeHandler = (event) => {
    const updatedElement = {
      ...authForm[event.target.id],
      value: event.target.value,
    }

    updatedElement.touched = true
    updatedElement.valid = validate(updatedElement)

    const updatedAuthForm = {
      ...authForm,
      [event.target.id]: updatedElement,
    }

    const updatedIsFormValid = validateForm(updatedAuthForm)

    setAuthForm(updatedAuthForm)
    setIsFormValid(updatedIsFormValid)
  }

  const validate = (element) => {
    if (!element.touched) return
    if (element.minLength) {
      return element.value.length >= element.minLength
    }
    if (element.required) {
      return element.value.trim() !== ''
    }
  }

  const validateForm = (form) => {
    const entries = Object.entries(form)
    for (const entry of entries) {
      if (!entry[1].valid) {
        return false
      }
    }

    return true
  }

  const submitHandler = (event) => {
    event.preventDefault()
    const { email, password } = authForm
    const method = isSignUp ? 'signUp' : 'signIn'
    props.authHandler(email.value, password.value, method)
  }

  const switchAuthModeHandler = () => {
    setIsSignUp(!isSignUp)
  }

  return (
    <>
      {props.isAuthenticated && <Redirect to={props.authRedirectPath} />}
      {props.error && <p>{props.error.message}</p>}
      {props.loading ? (
        <Spinner />
      ) : (
        <div className={styles.auth}>
          <form onSubmit={submitHandler}>
            {createForm()}
            <Button type="success" disabled={!isFormValid}>
              {isSignUp ? 'SIGN UP' : 'SIGN IN'}
            </Button>
          </form>
          <Button type="danger" onClick={switchAuthModeHandler}>
            SWITCH TO {isSignUp ? 'SIGN IN' : 'SIGN UP'}
          </Button>
        </div>
      )}
    </>
  )
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
