import * as actionTypes from './actions'
import { INGREDIENT_PRICES as PRICES } from '../const/data'

const initialState = {
  ingredients: null,
  price: 3,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient]++,
        },
        price: state.price + PRICES[action.ingredient],
      }
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredient,
          [action.ingredient]: state.ingredients[action.ingredient]--,
        },
        price: state.price - PRICES[action.ingredient],
      }
    default:
      return state
  }
}

export default reducer
