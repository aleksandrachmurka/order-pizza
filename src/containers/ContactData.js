import React, { Component } from 'react'
import axios from '../axios'
import Button from '../components/Button/Button'
import Spinner from '../components/Spinner/Spinner'
import Input from '../components/Input/Input'
import styles from './ContactData.module.css'

class ContactData extends Component {
  state = {
    orderForm: {
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
        length: 5,
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
    },
    isFormValid: false,
    loading: false,
  }

  validate = (element) => {
    if (!element.touched) return
    if (element.length) {
      return element.value.length >= element.length
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
      ...this.state.orderForm[event.target.id],
      value: event.target.value,
    }

    updatedElement.touched = true
    updatedElement.valid = this.validate(updatedElement)

    const updatedOrderForm = {
      ...this.state.orderForm,
      [event.target.id]: updatedElement,
    }

    const updatedIsFormValid = this.validateForm(updatedOrderForm)

    this.setState({
      orderForm: updatedOrderForm,
      isFormValid: updatedIsFormValid,
    })
  }

  createForm = () => {
    const elementsArray = []
    for (const key in this.state.orderForm) {
      elementsArray.push({
        id: key,
        key: key,
        ...this.state.orderForm[key],
      })
    }
    return elementsArray.map((element) => (
      <Input {...element} onChange={this.changeHandler} />
    ))
  }

  orderHandler = (event) => {
    event.preventDefault()
    this.setState({ loading: true })

    const customer = {}
    for (const element in this.state.orderForm) {
      customer[element] = this.state.orderForm[element].value
    }

    const order = {
      customer,
      ingredients: this.props.ingredients,
      price: this.props.price,
    }

    axios
      .post('/orders.json', order)
      .then((res) => {
        this.setState({ loading: false })
        this.props.history.push('/')
      })
      .catch((err) => {
        this.setState({ loading: false })
      })
  }

  render() {
    return this.state.loading ? (
      <Spinner />
    ) : (
      <div className={styles.contact}>
        <h4>Enter yout Contact Data</h4>
        <form onSubmit={this.orderHandler}>
          {this.createForm()}
          <Button type="success" disabled={!this.state.isFormValid}>
            ORDER
          </Button>
        </form>
      </div>
    )
  }
}

export default ContactData
