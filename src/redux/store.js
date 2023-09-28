import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer, userRegisterReducer } from "./Reducers/UserReducer";
import {
  houseListReducer,
  houseDetailReducer,
  houseCreateReducer,
  houseUpdateReducer,
  houseDeleteReducer,
} from "./Reducers/HouseReducer";
import { houseBookingCreateReducer } from "./Reducers/HouseBookingReducer";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  houseList: houseListReducer,
  houseDetail: houseDetailReducer,
  houseCreate: houseCreateReducer,
  houseUpdate: houseUpdateReducer,
  houseDelete: houseDeleteReducer,
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
