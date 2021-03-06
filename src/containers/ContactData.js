import React, { useState } from 'react'
import { connect } from 'react-redux'
import axios from '../axios'
import { orderActions } from '../store/actions/order'
import withError from '../hoc/withError'
import Button from '../components/Button/Button'
import Spinner from '../components/Spinner/Spinner'
import Input from '../components/Input/Input'
import styles from './ContactData.module.css'

const orderFormConfig = {
  name: {
    type: 'text',
    placeholder: 'Your name',
    value: '',
    required: true,
    valid: false,
    touched: false,
  },
  email: {
    type: 'email',
    placeholder: 'Your email',
    value: '',
    required: true,
    valid: false,
    touched: false,
  },
  street: {
    type: 'text',
    placeholder: 'Street',
    value: '',
    required: true,
    valid: false,
    touched: false,
  },
  postalCode: {
    type: 'text',
    placeholder: 'Postal code',
    value: '',
    required: true,
    requiredLength: 5,
    valid: false,
    touched: false,
  },
  delivery: {
    type: 'select',
    options: ['fastest', 'cheapest'],
    value: 'cheapest',
    required: true,
    valid: false,
    touched: false,
  },
}

const ContactData = (props) => {
  const [isFormValid, setIsFormValid] = useState(false)
  const [loading, setLoading] = useState(false)
  const [orderForm, setOrderForm] = useState(orderFormConfig)

  const validate = (element) => {
    if (!element.touched) return
    if (element.requiredLength) {
      return element.value.length >= element.requiredLength
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

  const changeHandler = (event) => {
    const updatedElement = {
      ...orderForm[event.target.id],
      value: event.target.value,
    }

    updatedElement.touched = true
    updatedElement.valid = validate(updatedElement)

    const updatedOrderForm = {
      ...orderForm,
      [event.target.id]: updatedElement,
    }

    const updatedIsFormValid = validateForm(updatedOrderForm)

    setOrderForm(updatedOrderForm)
    setIsFormValid(updatedIsFormValid)
  }

  const createForm = () => {
    const elementsArray = []
    for (const key in orderForm) {
      elementsArray.push({
        id: key,
        key: key,
        ...orderForm[key],
      })
    }
    return elementsArray.map((element) => (
      <Input {...element} onChange={changeHandler} />
    ))
  }

  const orderHandler = (event) => {
    event.preventDefault()

    const customer = {}
    for (const element in orderForm) {
      customer[element] = orderForm[element].value
    }

    const order = {
      customer,
      ingredients: props.ingredients,
      price: props.price,
      userId: props.userdId,
    }

    props.onOrderHandler(order, props.token)
  }

  return loading ? (
    <Spinner />
  ) : (
    <div className={styles.contact}>
      <h4>Enter yout Contact Data</h4>
      <form onSubmit={orderHandler}>
        {createForm()}
        <Button type="success" disabled={!isFormValid}>
          ORDER
        </Button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => ({
  ingredients: state.pizza.ingredients,
  price: state.pizza.price,
  token: state.authentication.token,
  userId: state.authentication.userId,
})

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderHandler: (order, token) =>
      dispatch(orderActions.orderStart(order, token)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withError(ContactData, axios))
