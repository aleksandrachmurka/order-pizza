import React from 'react'
import styles from './OrderDetails.module.css'

const OrderDetails = ({ ingredients, price }) => {
  const orderIngredients = Object.entries(ingredients).map((ingredient) => ({
    name: ingredient[0],
    amount: ingredient[1],
  }))

  return (
    <div className={styles.orderDetails}>
      <p>
        Ingredients:{' '}
        {orderIngredients.map((i) => (
          <span
            key={i.name}
            style={{
              textTransform: 'capitalize',
              display: 'inline-block',
              margin: '0 8px',
              border: '1px solid #ccc',
              padding: '5px',
            }}
          >
            {`${i.name} ${i.amount}`}
          </span>
        ))}
      </p>
      <p>
        Price: <strong>{Number.parseFloat(price).toFixed(2)}</strong>
      </p>
    </div>
  )
}

export default OrderDetails
