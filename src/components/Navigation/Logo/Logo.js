import React from 'react';
import appLogo from '../../../assets/appLogo.png';
import logo from './Logo.module.css'

const Logo = () => (
  <div className={logo.logo}>
    <img src={appLogo} alt="logo" />
  </div>
);

export default Logo;