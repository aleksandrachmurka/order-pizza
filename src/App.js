import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import styles from './App.module.css'
import Toolbar from './components/Navigation/Toolbar/Toolbar'
import Order from './containers/Order'
import Orders from './containers/Orders'
import CheckoutSummary from './containers/CheckoutSummary'
import SideDrawerToggler from './components/SideDrawer/SideDrawerToggler'
import SideDrawer from './components/SideDrawer/SideDrawer'

class App extends Component {
  state = {
    showSideDrawer: false,
  }

  toggleSideDrawerHandler = () => {
    this.setState((prevState) => ({
      showSideDrawer: !prevState.showSideDrawer,
    }))
  }

  render() {
    return (
      <>
        <header>
          <SideDrawerToggler
            show={this.state.showSideDrawer}
            toggleShow={this.toggleSideDrawerHandler}
          />
          <SideDrawer
            show={this.state.showSideDrawer}
            toggleShow={this.toggleSideDrawerHandler}
          />
          <Toolbar />
        </header>
        <main
          className={this.state.showSideDrawer ? styles.expanded : styles.main}
        >
          <Switch>
            <Route path="/checkout" component={CheckoutSummary}></Route>
            <Route path="/" exact component={Order}></Route>
            <Route path="/orders" component={Orders}></Route>
          </Switch>
        </main>
      </>
    )
  }
}

export default App
