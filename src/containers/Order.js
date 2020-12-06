import React, { Component } from 'react'
import axios from '../axios'
import { connect } from 'react-redux'
import withError from '../hoc//withError'
import { pizzaActions } from '../store/actions/pizza'
import { orderActions } from '../store/actions/order'
import { authActions } from '../store/actions/authentication'
import Pizza from '../components/Pizza/Pizza'
import IngredientsList from '../components/IngredientsList/IngredientsList'
import Modal from '../components/Modal/Modal'
import Spinner from '../components/Spinner/Spinner'
import OrderSummary from '../components/OrderSummary/OrderSummary'

class Order extends Component {
  state = {
    ordering: false,
    loading: false,
    error: false,
  }

  componentDidMount() {
    this.props.initiIngredientsHandler()
  }

  updateOrderEnabled = (ingredients) => {
    const sum = Object.values(ingredients).reduce((sum, el) => sum + el, 0)
    return sum > 0
  }

  orderHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ ordering: true })
    }
    this.props.setRedirectPathHandler('/checkout')
    this.props.history.push('/auth')
  }

  cancelOrderHandler = () => {
    this.setState({ ordering: false })
  }

  proceedToCheckoutHandler = () => {
    this.props.purachaseInitHandler()
    this.props.history.push('/checkout')
  }

  render() {
    return (
      <>
        <Modal show={this.state.ordering} close={this.cancelOrderHandler}>
          {!this.state.loading && this.props.ingredients ? (
            <OrderSummary
              ingredients={this.props.ingredients}
              price={this.props.price}
              cancel={this.cancelOrderHandler}
              proceed={this.proceedToCheckoutHandler}
            />
          ) : (
            <Spinner />
          )}
        </Modal>
        {this.props.ingredients ? (
          <>
            <Pizza ingredients={this.props.ingredients} />
            <IngredientsList
              price={this.props.price}
              ingredients={this.props.ingredients}
              addIngredient={this.props.addIngredientHandler}
              removeIngredient={this.props.removeIngredientHandler}
              orderEnabled={this.updateOrderEnabled(this.props.ingredients)}
              order={this.orderHandler}
              isAuthenticated={this.props.isAuthenticated}
            />
          </>
        ) : (
          <Spinner />
        )}
        {this.props.error && <p>Error loading ingredients</p>}
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  ingredients: state.pizza.ingredients,
  price: state.pizza.price,
  error: state.pizza.error,
  isAuthenticated: state.authentication.token !== null,
})

const mapDispatchToProps = (dispatch) => {
  return {
    addIngredientHandler: (ingredient) =>
      dispatch(pizzaActions.addIngredient(ingredient)),
    removeIngredientHandler: (ingredient) =>
      dispatch(pizzaActions.removeIngredient(ingredient)),
    purachaseInitHandler: () => dispatch(orderActions.purchaseInit()),
    initiIngredientsHandler: () => dispatch(pizzaActions.initIngredients()),
    setRedirectPathHandler: (path) =>
      dispatch(authActions.setAuthRedirectPath(path)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withError(Order, axios))
