import {
  HOUSE_LIST_FAIL,
  HOUSE_LIST_REQUEST,
  HOUSE_LIST_SUCCESS,
  HOUSE_DETAIL_FAIL,
  HOUSE_DETAIL_SUCCESS,
  HOUSE_DETAIL_REQUEST,
  HOUSE_CREATE_FAIL,
  HOUSE_CREATE_REQUEST,
  HOUSE_CREATE_SUCCESS,
  HOUSE_DELETE_FAIL,
  HOUSE_DELETE_REQUEST,
  HOUSE_DELETE_SUCCESS,
  HOUSE_UPDATE_FAIL,
  HOUSE_UPDATE_REQUEST,
  HOUSE_UPDATE_SUCCESS,
} from "../Constant/HouseConstant";

export const houseListReducer = (state = {}, action) => {
  switch (action.type) {
    case HOUSE_LIST_REQUEST:
      return { houses: null, loading: true, error: null };
    case HOUSE_LIST_SUCCESS:
      return { houses: action.payload, loading: false, error: null };
    case HOUSE_LIST_FAIL:
      return { houses: null, error: action.payload, loading: false };
    default:
      return state;
  }
};

export const houseDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case HOUSE_DETAIL_REQUEST:
      return { house: null, loading: true, error: null };
    case HOUSE_DETAIL_SUCCESS:
      return { house: action.payload, loading: false, error: null };
    case HOUSE_DETAIL_FAIL:
      return { house: null, error: action.payload, loading: false };
    default:
      return state;
  }
};

export const houseDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case HOUSE_DELETE_REQUEST:
      return { message: null, loading: true, error: null };
    case HOUSE_DELETE_SUCCESS:
      return { message: action.payload, loading: false, error: null };
    case HOUSE_DELETE_FAIL:
      return { message: null, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const houseCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case HOUSE_CREATE_REQUEST:
      return { house: null, loading: true, error: null };
    case HOUSE_CREATE_SUCCESS:
      return { house: action.payload, loading: false, error: null };
    case HOUSE_CREATE_FAIL:
      return { house: null, error: action.payload, loading: false };
    default:
      return state;
  }
};

export const houseUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case HOUSE_UPDATE_REQUEST:
      return { house: null, loading: true, error: null };
    case HOUSE_UPDATE_SUCCESS:
      return { house: action.payload, loading: false, error: null };
    case HOUSE_UPDATE_FAIL:
      return { house: null, error: action.payload, loading: false };
    default:
      return state;
  }
};
