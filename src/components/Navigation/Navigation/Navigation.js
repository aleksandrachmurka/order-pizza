import React from 'react'
import styles from './Navigation.module.css'
import NavItem from '../NavItem/NavItem'

const Navigation = () => (
  <nav>
    <ul className={styles.navigation}>
      <NavItem link="/" exact>
        Order
      </NavItem>
      <NavItem link="/orders">Orders</NavItem>
    </ul>
  </nav>
)

export default Navigation
