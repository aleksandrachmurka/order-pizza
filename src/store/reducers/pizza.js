import { actionTypes } from '../actions/pizza'
import { INGREDIENT_PRICES as PRICES } from '../../const/data'

const initialState = {
  ingredients: null,
  price: 3,
  error: false,
  choosing: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] + 1,
        },
        price: state.price + PRICES[action.ingredient],
        choosing: true,
      }
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredient,
          [action.ingredient]: state.ingredients[action.ingredient]--,
        },
        price: state.price - PRICES[action.ingredient],
        choosing: true,
      }
    case actionTypes.SET_INGREDIENTS: {
      return {
        ...state,
        ingredients: action.ingredients,
        price: initialState.price,
        error: false,
        choosing: false,
      }
    }
    case actionTypes.INIT_INGREDIENTS_FAILED: {
      return {
        ...state,
        error: true,
      }
    }
    default:
      return state
  }
}

export default reducer
