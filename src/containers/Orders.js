import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from '../axios'
import { orderActions } from '../store/actions/order'
import OrderDetails from '../components/OrderDetails/OrderDetails'
import withError from '../hoc/withError'
import Spinner from '../components/Spinner/Spinner'

class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrdersHandler()
  }

  render() {
    return (
      <>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <div>
            {this.props.orders.map((order) => (
              <OrderDetails
                key={order.id}
                ingredients={order.ingredients}
                price={order.price}
              />
            ))}
          </div>
        )}
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrdersHandler: () => dispatch(orderActions.fetchOrders()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withError(Orders, axios))
