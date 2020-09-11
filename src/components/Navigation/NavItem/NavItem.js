import React from 'react';
import navItem from './NavItem.module.css';

const NavItem = ({ children, link, active }) => (
  <li className={navItem.navItem}>
    <a href={link} className={active && navItem.active}>{children}</a>
  </li>
);

export default NavItem;