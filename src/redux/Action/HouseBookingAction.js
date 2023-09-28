import axios from "axios";
import {
  HOUSE_BOOKING_CREATE_FAIL,
  HOUSE_BOOKING_CREATE_REQUEST,
  HOUSE_BOOKING_CREATE_SUCCESS,
} from "../Constant/HouseBookingConstant";

export const createHouseBooking =
  (email, fullName, phone, message, homeId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: HOUSE_BOOKING_CREATE_REQUEST,
      });
      const {
        userLogin: { user },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        `http://localhost:3443/api/users/bookHome`,
        {
          email,
          fullName,
          phone,
          message,
          homeId,
        },
        config
      );
      console.log(res);

      dispatch({
        type: HOUSE_BOOKING_CREATE_SUCCESS,
        payload: res.data.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: HOUSE_BOOKING_CREATE_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };
