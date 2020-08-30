import React from 'react';
import ingredientsList from './IngredientsList.module.css';
import IngredientControl from './IngredientControl/IngredientControl';
import { INGREDIENTS } from '../../const/data';

const IngredientsList = ({
  price,
  ingredients,
  addIngredient,
  removeIngredient,
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
      <p>Current Price:<strong>{price.toFixed(2)}</strong></p>
    </div>
  )

export default IngredientsList;
