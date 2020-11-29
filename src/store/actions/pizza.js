import axios from '../../axios'

export const actionTypes = {
  ADD_INGREDIENT: 'ADD_INGREDIENT',
  REMOVE_INGREDIENT: 'REMOVE_INGREDIENT',
  SET_INGREDIENTS: 'SET_INGREDIENTS',
  INIT_INGREDIENTS_FAILED: 'INIT_INGREDIENTS_FAILED',
}

const initIngredients = () => {
  return (dispatch) => {
    axios
      .get('https://pizza-c75f6.firebaseio.com/ingredients.json')
      .then((res) => {
        dispatch(setIngredients(res.data))
      })
      .catch((err) => {
        dispatch(initIngredientsFailed)
      })
  }
}

const initIngredientsFailed = () => ({
  type: actionTypes.INIT_INGREDIENTS_FAILED,
})

const addIngredient = (ingredient) => ({
  type: actionTypes.ADD_INGREDIENT,
  ingredient,
})

const removeIngredient = (ingredient) => ({
  type: actionTypes.REMOVE_INGREDIENT,
  ingredient,
})

const setIngredients = (ingredients) => ({
  type: actionTypes.SET_INGREDIENTS,
  ingredients,
})

export const pizzaActions = {
  initIngredients,
  addIngredient,
  removeIngredient,
}
