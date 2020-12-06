import React from 'react'
import toolbar from './Toolbar.module.css'
import Logo from '../Logo/Logo'
import Navigation from '../Navigation/Navigation'

const Toolbar = ({ showSideDrawer, toggleShowSideDrawer, isAuthenticated }) => (
  <div className={toolbar.toolbar}>
    <Logo />
    <Navigation isAuthenticated={isAuthenticated} />
  </div>
)

export default Toolbar
