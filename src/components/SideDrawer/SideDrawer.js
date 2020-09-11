import React from 'react';
import Navigation from '../Navigation/Navigation/Navigation';
import Logo from '../Navigation/Logo/Logo';
import Backdrop from '../Backdrop/Backdrop';
import classes from './SideDrawer.module.css';

const SideDrawer = ({ show, toggleShow }) => (
  show &&
  <>
    <Backdrop show={show} close={toggleShow} />
    <div className={`${classes.sideDrawer} ${show ? classes.open : classes.closed}`}>
      <Logo />
      <Navigation />
    </div>
  </>
);

export default SideDrawer;