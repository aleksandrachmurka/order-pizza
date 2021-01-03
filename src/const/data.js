export const INGREDIENTS = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
]

export const INGREDIENT_PRICES = {
  salad: 1,
  bacon: 2,
  cheese: 1,
  meat: 3,
}

export const AUTH_URLS = {
  signUp: process.env.REACT_APP_SIGN_UP,
  signIn: process.env.REACT_APP_SIGN_IN,
  getUserData: process.env.REACT_APP_GET_USER_DATA,
}
