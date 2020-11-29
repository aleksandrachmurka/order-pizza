import { actionTypes } from '../actions/order'

const initialState = {
  orders: [],
  ordering: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ORDER_SUCCESS: {
      const newOrder = {
        ...action.order,
        id: action.orderId,
      }
      return {
        ...state,
        loading: false,
        purchased: true,
        orders: [...state.orders, newOrder],
      }
    }
    case actionTypes.ORDER_FAIL: {
      return {
        ...state,
        loading: false,
        error: true,
      }
    }
    case actionTypes.PURCHASE_INIT: {
      return {
        ...state,
        purchased: false,
      }
    }
    case actionTypes.FETCH_ORDERS_INIT: {
      return {
        ...state,
        loading: true,
      }
    }
    case actionTypes.FETCH_ORDERS_SUCCESS: {
      return {
        ...state,
        orders: action.orders,
        loading: false,
      }
    }
    case actionTypes.FETCH_ORDERS_FAIL: {
      return {
        ...state,
        loading: false,
      }
    }
    default:
      return state
  }
}

export default reducer
