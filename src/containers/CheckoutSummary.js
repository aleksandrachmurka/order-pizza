import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Checkout from '../components/Checkout/Checkout'
import ContactData from './ContactData'

const CheckoutSummary = (props) => {
  const cancelHandler = () => {
    props.history.goBack()
  }

  const proceedHandler = () => {
    props.history.replace('/checkout/contact-data')
  }

  return (
    <>
      {props.ingredients && !props.purchased ? (
        <div>
          <Checkout
            ingredients={props.ingredients}
            cancel={cancelHandler}
            proceed={proceedHandler}
          />
          <Route
            path={`${props.match.path}/contact-data`}
            component={ContactData}
          />
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </>
  )
}

const mapStateToProps = (state) => ({
  ingredients: state.pizza.ingredients,
  purchased: state.order.purchased,
})

export default connect(mapStateToProps)(CheckoutSummary)
