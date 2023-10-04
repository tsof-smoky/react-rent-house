import {
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_DETAIL_FAIL,
  ORDER_DETAIL_SUCCESS,
  ORDER_DETAIL_REQUEST,
  ORDER_DELETE_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_UPDATE_FAIL,
  ORDER_UPDATE_REQUEST,
  ORDER_UPDATE_SUCCESS,
} from "../Constant/OrderConstant";

export const orderListReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { orders: null, loading: true, error: null };
    case ORDER_LIST_SUCCESS:
      return { orders: action.payload, loading: false, error: null };
    case ORDER_LIST_FAIL:
      return { orders: null, error: action.payload, loading: false };
    default:
      return state;
  }
};

export const orderDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DETAIL_REQUEST:
      return { order: null, loading: true, error: null };
    case ORDER_DETAIL_SUCCESS:
      return { order: action.payload, loading: false, error: null };
    case ORDER_DETAIL_FAIL:
      return { order: null, error: action.payload, loading: false };
    default:
      return state;
  }
};

export const orderDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELETE_REQUEST:
      return { message: null, loading: true, error: null };
    case ORDER_DELETE_SUCCESS:
      return { message: action.payload, loading: false, error: null };
    case ORDER_DELETE_FAIL:
      return { message: null, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_UPDATE_REQUEST:
      return { order: null, loading: true, error: null };
    case ORDER_UPDATE_SUCCESS:
      return { order: action.payload, loading: false, error: null };
    case ORDER_UPDATE_FAIL:
      return { order: null, error: action.payload, loading: false };
    default:
      return state;
  }
};
