import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userRegisterReducer,
  userListReducer,
  userUpdateReducer,
  userDeleteReducer,
} from "./Reducers/UserReducer";
import {
  houseListReducer,
  houseDetailReducer,
  houseCreateReducer,
  houseUpdateReducer,
  houseDeleteReducer,
} from "./Reducers/HouseReducer";
import {
  orderListReducer,
  orderDetailReducer,
  orderUpdateReducer,
  orderDeleteReducer,
} from "./Reducers/OrderReducer";
import { houseBookingCreateReducer } from "./Reducers/HouseBookingReducer";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userList: userListReducer,
  userUpdate: userUpdateReducer,
  userDelete: userDeleteReducer,
  houseList: houseListReducer,
  houseDetail: houseDetailReducer,
  houseCreate: houseCreateReducer,
  houseUpdate: houseUpdateReducer,
  houseDelete: houseDeleteReducer,
  orderList: orderListReducer,
  orderDetail: orderDetailReducer,
  orderUpdate: orderUpdateReducer,
  orderDelete: orderDeleteReducer,
  houseBookingCreate: houseBookingCreateReducer,
});

const userFromLocal = localStorage.getItem("USER")
  ? JSON.parse(localStorage.getItem("USER"))
  : null;

const initialState = {
  userLogin: {
    user: userFromLocal,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
