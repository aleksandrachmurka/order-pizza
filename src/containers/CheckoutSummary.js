import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
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
    )
  }
}

const mapStateToProps = (state) => ({
  ingredients: state.ingredients,
})

export default connect(mapStateToProps)(CheckoutSummary)
