import React from 'react';
import classes from './SideDrawerToggler.module.css';

const SideDrawerToggler = ({ show, toggleShow }) => (
  !show &&
  <div
    className={classes.toggle}
    onClick={toggleShow}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default SideDrawerToggler;