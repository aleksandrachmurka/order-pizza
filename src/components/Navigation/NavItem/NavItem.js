import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './NavItem.module.css'

const NavItem = ({ children, link, exact }) => (
  <li className={styles.navItem}>
    <NavLink to={link} exact={exact} activeClassName={styles.active}>
      {children}
    </NavLink>
  </li>
)

export default NavItem
