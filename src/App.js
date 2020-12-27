import React, { Component } from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { authActions } from './store/actions/authentication'
import Order from './containers/Order'
import Authentication from './containers/Authentication'
import Logout from './containers/Logout'
import LazyComponent from './hoc/lazyComponent'
import Toolbar from './components/Navigation/Toolbar/Toolbar'
import SideDrawerToggler from './components/SideDrawer/SideDrawerToggler'
import SideDrawer from './components/SideDrawer/SideDrawer'
import styles from './App.module.css'

const lazyCheckoutSummary = LazyComponent(() => {
  return import('./containers/CheckoutSummary')
})
const lazyOrders = LazyComponent(() => {
  return import('./containers/Orders')
})

class App extends Component {
  state = {
    showSideDrawer: false,
  }

  componentDidMount() {
    this.props.autoSingInHandler()
  }

  toggleSideDrawerHandler = () => {
    this.setState((prevState) => ({
      showSideDrawer: !prevState.showSideDrawer,
    }))
  }

  render() {
    const authRoutes = (
      <>
        <Route path="/orders" component={lazyOrders}></Route>
        <Route path="/checkout" component={lazyCheckoutSummary}></Route>
      </>
    )

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
            isAuthenticated={this.props.isAuthenticated}
          />
          <Toolbar isAuthenticated={this.props.isAuthenticated} />
        </header>
        <main
          className={this.state.showSideDrawer ? styles.expanded : styles.main}
        >
          <Switch>
            <Route path="/" exact component={Order}></Route>
            <Route path="/auth" component={Authentication}></Route>
            <Route path="/logout" component={Logout}></Route>
            {this.props.isAuthenticated && authRoutes}
            <Redirect to="/" />
          </Switch>
        </main>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.authentication.token !== null,
})

const mapDispatchToProps = (dispatch) => ({
  autoSingInHandler: () => dispatch(authActions.checkAuth()),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
