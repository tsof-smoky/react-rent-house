import axios from "axios";

import {
    PAYMENT_REQUEST,
    PAYMENT_REQUEST_SUCCESS,
    PAYMENT_REQUEST_FAIL
} from "../Constant/PaymentConstant";

export const payment = (amount, bankCode) => async (dispatch) => {
    try {
        dispatch({
          type: PAYMENT_REQUEST,
        });
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const res = await axios.post(
          `http://localhost:3443/create_payment_url   `,
          {
            amount,
            bankCode,
          },
          config
        );
        dispatch({
          type: PAYMENT_REQUEST_SUCCESS,
          payload: res.data,
        });
      } catch (error) {
        dispatch({
          type: PAYMENT_REQUEST_FAIL,
          payload: error?.response?.data?.message,
        });
      }
}