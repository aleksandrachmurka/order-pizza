import React from 'react'
import styles from './Navigation.module.css'
import NavItem from '../NavItem/NavItem'

const Navigation = ({ isAuthenticated }) => (
  <nav>
    <ul className={styles.navigation}>
      <NavItem link="/" exact>
        Order
      </NavItem>
      {isAuthenticated && <NavItem link="/orders">Orders</NavItem>}
      {isAuthenticated ? (
        <NavItem link="/logout">Log out</NavItem>
      ) : (
        <NavItem link="/auth">Authenticate</NavItem>
      )}
    </ul>
  </nav>
)

export default Navigation
