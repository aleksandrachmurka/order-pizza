import React from 'react';
import ingredientControl from './IngredientControl.module.css';

const IngredientControl = props => (
  <div className={ingredientControl.item}>
    <div>{props.label}</div>
    <button className={ingredientControl.button} onClick={props.add}>
      Add
    </button>
    <button className={ingredientControl.button} onClick={props.remove} disabled={props.disabled}>
      Remove
    </button>
  </div>
);


export default IngredientControl;