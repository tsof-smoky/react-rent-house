import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "../Constant/UserConstant";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { user: null, error: null };
    case USER_LOGIN_SUCCESS:
      localStorage.setItem("USER", JSON.stringify(action.payload));
      return { user: action.payload, error: null };
    case USER_LOGIN_FAIL:
      return { user: null, error: action.payload };
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { user: null, error: null };
    case USER_REGISTER_SUCCESS:
      localStorage.setItem("USER", JSON.stringify(action.payload));
      return { user: action.payload, error: null };
    case USER_REGISTER_FAIL:
      return { user: null, error: action.payload };
    default:
      return state;
  }
};

export const userListReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { users: null, loading: true, error: null };
    case USER_LIST_SUCCESS:
      return { users: action.payload, loading: false, error: null };
    case USER_LIST_FAIL:
      return { users: null, error: action.payload, loading: false };
    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { message: null, loading: true, error: null };
    case USER_DELETE_SUCCESS:
      return { message: action.payload, loading: false, error: null };
    case USER_DELETE_FAIL:
      return { message: null, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { user: null, loading: true, error: null };
    case USER_UPDATE_SUCCESS:
      return { user: action.payload, loading: false, error: null };
    case USER_UPDATE_FAIL:
      return { user: null, error: action.payload, loading: false };
    default:
      return state;
  }
};
