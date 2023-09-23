import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userChangepassword,
  userLoginReducer,
  userInfoUpdatedReducer,
  userRegisterReducer,
  userListReducer,
  userAddedReducer,
  userEditedReducer,
  userDeletedReducer,
} from "./Reducers/UserReducer";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userInfoUpdated: userInfoUpdatedReducer,
  userChangpassword: userChangepassword,
  userList: userListReducer,
  userAdded: userAddedReducer,
  userEdited: userEditedReducer,
  userDeleted: userDeletedReducer,
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
