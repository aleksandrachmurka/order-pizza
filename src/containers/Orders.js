import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import axios from '../axios'
import { orderActions } from '../store/actions/order'
import OrderDetails from '../components/OrderDetails/OrderDetails'
import withError from '../hoc/withError'
import Spinner from '../components/Spinner/Spinner'

const Orders = (props) => {
  const { token, userId, fetchOrdersHandler } = props
  useEffect(() => {
    fetchOrdersHandler(token, userId)
  }, [token, userId, fetchOrdersHandler])

  return (
    <>
      {props.loading ? (
        <Spinner />
      ) : (
        <div>
          {props.orders.map((order) => (
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

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.authentication.token,
    userId: state.authentication.userId,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrdersHandler: (token, userId) =>
      dispatch(orderActions.fetchOrders(token, userId)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withError(Orders, axios))
