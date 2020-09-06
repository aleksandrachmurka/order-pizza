import React from 'react';
import toolbar from './Toolbar.module.css';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

const Toolbar = ({ showSideDrawer, toggleShowSideDrawer }) => (
  <div className={toolbar.toolbar}>
    <Logo />
    <Navigation />
  </div>
);

export default Toolbar;