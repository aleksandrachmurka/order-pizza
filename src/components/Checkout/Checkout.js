import React from 'react'
import Pizza from '../Pizza/Pizza'
import Button from '../Button/Button'
import styles from './Checkout.module.css'

const Checkout = ({ ingredients, cancel, proceed }) => {
  return (
    <div className={styles.checkoutContainer}>
      <h1>We hope it tastes well!</h1>
      <div className={styles.checkoutPizza}>
        <Pizza ingredients={ingredients} />
      </div>
      <Button type="danger" onClick={cancel}>
        CANCEL
      </Button>
      <Button type="success" onClick={proceed}>
        CONTINUE
      </Button>
    </div>
  )
}

export default Checkout
