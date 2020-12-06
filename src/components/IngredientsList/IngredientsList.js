import React from 'react'
import IngredientControl from '../IngredientControl/IngredientControl'
import ingredientsList from './IngredientsList.module.css'
import { INGREDIENTS } from '../../const/data'

const IngredientsList = ({
  price,
  ingredients,
  addIngredient,
  removeIngredient,
  orderEnabled,
  order,
  isAuthenticated,
}) => (
  <div className={ingredientsList.list}>
    {INGREDIENTS.map(({ label, type }) => (
      <IngredientControl
        key={label}
        label={label}
        add={() => addIngredient(type)}
        remove={() => removeIngredient(type)}
        disabled={ingredients[type] <= 0}
      />
    ))}
    <p>
      Current Price:<strong>{price.toFixed(2)}</strong>
    </p>
    <button
      className={ingredientsList.orderButton}
      disabled={!orderEnabled}
      onClick={order}
    >
      {isAuthenticated ? 'Place an order' : 'Sign in to order'}
    </button>
  </div>
)

export default IngredientsList
