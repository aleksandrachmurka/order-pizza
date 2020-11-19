import React, { Component } from 'react'
import axios from '../axios'
import Button from '../components/Button/Button'
import Spinner from '../components/Spinner/Spinner'
import styles from './ContactData.module.css'

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    loading: false,
  }

  orderHandler = (event) => {
    event.preventDefault()
    this.setState({ loading: true })
    const order = {
      customer: {
        name: 'Me',
        email: 'me@test.com',
        phone: '984793083',
        address: {
          street: 'Street',
          houseNumber: 3,
          zipCode: '89736',
        },
      },
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
        <form>
          <input
            className={styles.input}
            type="text"
            name="name"
            placeholder="Your name"
          />
          <input
            className={styles.input}
            type="email"
            name="email"
            placeholder="Your email"
          />
          <input
            className={styles.input}
            type="text"
            name="street"
            placeholder="Your street"
          />
          <input
            className={styles.input}
            type="text"
            name="postal"
            placeholder="Your postal code"
          />
          <Button type="success" onClick={this.orderHandler}>
            ORDER
          </Button>
        </form>
      </div>
    )
  }
}

export default ContactData
