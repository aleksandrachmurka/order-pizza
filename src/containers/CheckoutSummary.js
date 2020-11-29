import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { orderActions } from '../store/actions/order'
import Checkout from '../components/Checkout/Checkout'
import ContactData from './ContactData'

class CheckoutSummary extends Component {
  cancelHandler = () => {
    this.props.history.goBack()
  }

  proceedHandler = () => {
    this.props.history.replace('/checkout/contact-data')
  }

  render() {
    return (
      <>
        {this.props.ingredients && !this.props.purchased ? (
          <div>
            <Checkout
              ingredients={this.props.ingredients}
              cancel={this.cancelHandler}
              proceed={this.proceedHandler}
            />
            <Route
              path={`${this.props.match.path}/contact-data`}
              component={ContactData}
            />
          </div>
        ) : (
          <Redirect to="/" />
        )}
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  ingredients: state.pizza.ingredients,
  purchased: state.order.purchased,
})

export default connect(mapStateToProps)(CheckoutSummary)
