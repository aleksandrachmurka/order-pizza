import React from 'react';
import Button from '../Button/Button';

const OrderSummary = ({ ingredients, price, proceed, cancel }) => {
  const ingredientsArray = Object.entries(ingredients)
  return (
    <>
      <h3>Your Order</h3>
      <p>Traditional Polish Pizza with:</p>
      <ul>
        {
          ingredientsArray.map(([key, value]) => (
            <li key={key}>{key}: {value}</li>
          ))
        }
      </ul>
      <p>Total price: <strong>{price.toFixed(2)}</strong> </p>
      <p>Proceed to Checkout?</p>
      <Button type={'success'} onClick={proceed}>OK</Button>
      <Button type={'danger'} onClick={cancel}>CANCEL</Button>
    </>
  )
};

export default OrderSummary;