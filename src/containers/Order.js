import React, { Component } from 'react'
import Pizza from '../components/Pizza/Pizza'
import IngredientsList from '../components/IngredientsList/IngredientsList'
import Modal from '../components/Modal/Modal'
import Spinner from '../components/Spinner/Spinner'
import OrderSummary from '../components/OrderSummary/OrderSummary'
import { INGREDIENTS_PRICES as PRICES } from '../const/data'
import withError from '../hoc//withError'
import axios from '../axios'

class Order extends Component {
  state = {
    ingredients: null,
    price: 3,
    orderEnabled: false,
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

  addIngredientHandler = (type) => {
    const ingredients = {
      ...this.state.ingredients,
      [type]: this.state.ingredients[type] + 1,
    }
    const price = this.state.price + PRICES[type]
    this.setState({ ingredients, price })
    this.updateOrderEnabled(ingredients)
  }

  removeIngredientHandler = (type) => {
    const ingredients = {
      ...this.state.ingredients,
      [type]: this.state.ingredients[type] - 1,
    }
    const price = this.state.price - PRICES[type]
    this.setState({ ingredients, price })
    this.updateOrderEnabled(ingredients)
  }

  updateOrderEnabled = (ingredients) => {
    const sum = Object.values(ingredients).reduce((sum, el) => sum + el, 0)
    this.setState({
      orderEnabled: sum > 0,
    })
  }

  orderHandler = () => {
    this.setState({ ordering: true })
  }

  cancelOrderHandler = () => {
    this.setState({ ordering: false })
  }

  proceedToCheckoutHandler = () => {
    const queryParams = []

    for (const i in this.state.ingredients) {
      queryParams.push(
        `${encodeURIComponent(i)}=${encodeURIComponent(
          this.state.ingredients[i]
        )}`
      )
    }

    queryParams.push(`price=${this.state.price}`)
    const queryString = queryParams.join('&')

    this.props.history.push({
      pathname: '/checkout',
      search: `?${queryString}`,
    })
  }

  render() {
    return (
      <>
        <Modal show={this.state.ordering} close={this.cancelOrderHandler}>
          {!this.state.loading && this.state.ingredients ? (
            <OrderSummary
              ingredients={this.state.ingredients}
              price={this.state.price}
              cancel={this.cancelOrderHandler}
              proceed={this.proceedToCheckoutHandler}
            />
          ) : (
            <Spinner />
          )}
        </Modal>
        {this.state.ingredients ? (
          <>
            <Pizza ingredients={this.state.ingredients} />
            <IngredientsList
              price={this.state.price}
              ingredients={this.state.ingredients}
              addIngredient={this.addIngredientHandler}
              removeIngredient={this.removeIngredientHandler}
              orderEnabled={this.state.orderEnabled}
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

export default withError(Order, axios)
