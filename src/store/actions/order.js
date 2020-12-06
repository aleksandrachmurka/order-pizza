import axios from '../../axios'

export const actionTypes = {
  ORDER_SUCCESS: 'ORDER_SUCCESS',
  ORDER_FAIL: 'ORDER_FAIL',
  PURCHASE_INIT: 'PURCHASE_INIT',
  FETCH_ORDERS_INIT: 'FETCH_ORDERS',
  FETCH_ORDERS_SUCCESS: 'FETCH_ORDERS_SUCCESS',
  FETCH_ORDERS_FAIL: 'FETCH_ORDERS_FAIL',
}

const orderSuccess = (orderId, order) => ({
  type: actionTypes.ORDER_SUCCESS,
  orderId,
  order,
})

const orderFail = (error) => ({
  type: actionTypes.ORDER_FAIL,
  error,
})

const orderStart = (order, token) => {
  return (dispatch) => {
    dispatch(purchaseInit())
    axios
      .post(`/orders.json?auth=${token}`, order)
      .then((res) => {
        dispatch(orderSuccess(res.data.name, order))
      })
      .catch((err) => {
        dispatch(orderFail(err))
      })
  }
}

const purchaseInit = () => ({
  type: actionTypes.PURCHASE_INIT,
})

const fetchOrdersInit = () => ({
  type: actionTypes.FETCH_ORDERS_INIT,
})

const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders,
  }
}

const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error,
  }
}

const fetchOrders = (token, userId) => {
  return (dispatch) => {
    dispatch(fetchOrdersInit())
    const queryParams = `?auth=${token}&orderBy="userId"&equalTo"${userId}"`
    axios
      .get(`https://pizza-c75f6.firebaseio.com/orders.json${queryParams}`)
      .then((res) => {
        const fetchedOrders = []
        for (const key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          })
        }
        dispatch(fetchOrdersSuccess(fetchedOrders))
      })
      .catch((error) => {
        dispatch(fetchOrdersFail(error))
      })
  }
}

export const orderActions = {
  orderSuccess,
  orderFail,
  orderStart,
  purchaseInit,
  fetchOrdersInit,
  fetchOrdersSuccess,
  fetchOrdersFail,
  fetchOrders,
}
