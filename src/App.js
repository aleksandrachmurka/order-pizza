import React, { useState, useEffect, Suspense } from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { authActions } from './store/actions/authentication'
import Order from './containers/Order'
import Authentication from './containers/Authentication'
import Logout from './containers/Logout'
import Toolbar from './components/Navigation/Toolbar/Toolbar'
import SideDrawerToggler from './components/SideDrawer/SideDrawerToggler'
import SideDrawer from './components/SideDrawer/SideDrawer'
import styles from './App.module.css'

const CheckoutSummary = React.lazy(() => {
  return import('./containers/CheckoutSummary')
})
const Orders = React.lazy(() => {
  return import('./containers/Orders')
})

const App = (props) => {
  const { autoSingInHandler } = props
  const [showSideDrawer, setShowSideDrawer] = useState(false)

  useEffect(() => {
    autoSingInHandler()
  }, [])

  const toggleSideDrawerHandler = () => {
    setShowSideDrawer(!showSideDrawer)
  }

  const authRoutes = (
    <Suspense fallback={<p>Loading... </p>}>
      <Route path="/orders" render={(props) => <Orders {...props} />} />
      <Route
        path="/checkout"
        render={(props) => <CheckoutSummary {...props} />}
      />
    </Suspense>
  )

  return (
    <>
      <header>
        <SideDrawerToggler
          show={showSideDrawer}
          toggleShow={toggleSideDrawerHandler}
        />
        <SideDrawer
          show={showSideDrawer}
          toggleShow={toggleSideDrawerHandler}
          isAuthenticated={props.isAuthenticated}
        />
        <Toolbar isAuthenticated={props.isAuthenticated} />
      </header>
      <main className={showSideDrawer ? styles.expanded : styles.main}>
        <Switch>
          <Route path="/" exact component={Order}></Route>
          <Route path="/auth" component={Authentication}></Route>
          <Route path="/logout" component={Logout}></Route>
          {props.isAuthenticated && authRoutes}
          <Redirect to="/" />
        </Switch>
      </main>
    </>
  )
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.authentication.token !== null,
})

const mapDispatchToProps = (dispatch) => ({
  autoSingInHandler: () => dispatch(authActions.checkAuth()),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
