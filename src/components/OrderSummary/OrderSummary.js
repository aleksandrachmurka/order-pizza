import React from 'react';

const OrderSummary = ({ ingredients }) => {
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
    </>
  )
};

export default OrderSummary;