import {
  HOUSE_BOOKING_CREATE_FAIL,
  HOUSE_BOOKING_CREATE_REQUEST,
  HOUSE_BOOKING_CREATE_SUCCESS,
} from "../Constant/HouseBookingConstant";

export const houseBookingCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case HOUSE_BOOKING_CREATE_REQUEST:
      return { message: null, error: null };
    case HOUSE_BOOKING_CREATE_SUCCESS:
      return { message: action.payload, error: null };
    case HOUSE_BOOKING_CREATE_FAIL:
      return { message: null, error: action.payload };
    default:
      return state;
  }
};
