import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Checkout from '../components/Checkout/Checkout'
import ContactData from './ContactData'

class CheckoutSummary extends Component {
  state = {
    ingredients: null,
    price: 0,
  }

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search)
    const ingredients = {}
    let price

    for (const param of query.entries()) {
      if (param[0] === 'price') {
        price = param[1]
      } else {
        ingredients[param[0]] = +param[1]
      }
    }
    this.setState({ ingredients, price })
  }

  cancelHandler = () => {
    this.props.history.goBack()
  }

  proceedHandler = () => {
    this.props.history.replace('/checkout/contact-data')
  }

  render() {
    return (
      <div>
        <Checkout
          ingredients={this.state.ingredients}
          cancel={this.cancelHandler}
          proceed={this.proceedHandler}
        />
        <Route
          path={`${this.props.match.path}/contact-data`}
          render={(props) => (
            <ContactData
              {...props}
              ingredients={this.state.ingredients}
              price={this.state.price}
            />
          )}
        />
      </div>
    )
  }
}

export default CheckoutSummary
