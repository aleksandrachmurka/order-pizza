import React from 'react';
import styles from './Navigation.module.css';
import NavItem from '../NavItem/NavItem';

const Navigation = () => (
  <nav>
    <ul className={styles.navigation}>
      <NavItem link="" active>Order</NavItem>
      <NavItem link="/">Checkout</NavItem>
    </ul>
  </nav>
);

export default Navigation;