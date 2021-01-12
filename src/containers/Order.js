import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from '../axios'
import withError from '../hoc//withError'
import { pizzaActions } from '../store/actions/pizza'
import { orderActions } from '../store/actions/order'
import { authActions } from '../store/actions/authentication'
import Pizza from '../components/Pizza/Pizza'
import IngredientsList from '../components/IngredientsList/IngredientsList'
import Modal from '../components/Modal/Modal'
import Spinner from '../components/Spinner/Spinner'
import OrderSummary from '../components/OrderSummary/OrderSummary'

const Order = (props) => {
  const [ordering, setOrdering] = useState(false)

  const dispatch = useDispatch()
  const addIngredientHandler = (ingredient) =>
    dispatch(pizzaActions.addIngredient(ingredient))
  const removeIngredientHandler = (ingredient) =>
    dispatch(pizzaActions.removeIngredient(ingredient))
  const purachaseInitHandler = () => dispatch(orderActions.purchaseInit())
  const initIngredientsHandler = useCallback(
    () => dispatch(pizzaActions.initIngredients()),
    [dispatch]
  )
  const setRedirectPathHandler = (path) =>
    dispatch(authActions.setAuthRedirectPath(path))

  const ingredients = useSelector((state) => state.pizza.ingredients)
  const price = useSelector((state) => state.pizza.price)
  const error = useSelector((state) => state.pizza.error)
  const isAuthenticated = useSelector(
    (state) => state.authentication.token !== null
  )

  useEffect(() => {
    initIngredientsHandler()
  }, [initIngredientsHandler])

  const updateOrderEnabled = (ingredients) => {
    const sum = Object.values(ingredients).reduce((sum, el) => sum + el, 0)
    return sum > 0
  }

  const orderHandler = () => {
    if (isAuthenticated) {
      setOrdering(true)
    }
    setRedirectPathHandler('/checkout')
    props.history.push('/auth')
  }

  const cancelOrderHandler = () => {
    setOrdering(false)
  }

  const proceedToCheckoutHandler = () => {
    purachaseInitHandler()
    props.history.push('/checkout')
  }

  return (
    <>
      <Modal show={ordering} close={cancelOrderHandler}>
        {ingredients ? (
          <OrderSummary
            ingredients={ingredients}
            price={price}
            cancel={cancelOrderHandler}
            proceed={proceedToCheckoutHandler}
          />
        ) : (
          <Spinner />
        )}
      </Modal>
      {ingredients ? (
        <>
          <Pizza ingredients={ingredients} />
          <IngredientsList
            price={price}
            ingredients={ingredients}
            addIngredient={addIngredientHandler}
            removeIngredient={removeIngredientHandler}
            orderEnabled={updateOrderEnabled(ingredients)}
            order={orderHandler}
            isAuthenticated={isAuthenticated}
          />
        </>
      ) : (
        <Spinner />
      )}
      {error && <p>Error loading ingredients</p>}
    </>
  )
}

export default withError(Order, axios)
