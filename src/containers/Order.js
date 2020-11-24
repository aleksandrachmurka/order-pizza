import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from '../axios'
import withError from '../hoc//withError'
import * as actionTypes from '../store/actions'
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
    axios
      .get('https://pizza-c75f6.firebaseio.com/ingredients.json')
      .then((res) => {
        this.setState({ ingredients: res.data })
      })
      .catch((err) => this.setState({ error: true }))
  }

  updateOrderEnabled = (ingredients) => {
    const sum = Object.values(ingredients).reduce((sum, el) => sum + el, 0)
    return sum > 0
  }

  orderHandler = () => {
    this.setState({ ordering: true })
  }

  cancelOrderHandler = () => {
    this.setState({ ordering: false })
  }

  proceedToCheckoutHandler = () => {
    this.props.history.push('/checkout')
  }

  render() {
    return (
      <>
        <Modal show={this.state.ordering} close={this.cancelOrderHandler}>
          {!this.state.loading && this.state.ingredients ? (
            <OrderSummary
              ingredients={this.sprops.ingredients}
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
            />
          </>
        ) : (
          <Spinner />
        )}
        {this.state.error && <p>Error loading ingredients</p>}
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  ingredients: state.ingredients,
  price: state.price,
})

const mapDispatchToProps = (dispatch) => {
  return {
    addIngredientHandler: (ingredient) =>
      dispatch({
        type: actionTypes.ADD_INGREDIENT,
        ingredient,
      }),
    removeIngredientHandler: (ingredient) =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        ingredient,
      }),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withError(Order, axios))
