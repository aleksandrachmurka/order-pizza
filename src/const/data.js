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
  signUp:
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCL5vMuLhOi4CaI_oiEuQscayH6FV3DswM',
  signIn:
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCL5vMuLhOi4CaI_oiEuQscayH6FV3DswM',
  getUserData:
    'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCL5vMuLhOi4CaI_oiEuQscayH6FV3DswM',
}
