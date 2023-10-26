import { httpFile } from "../../core/api/http";
import { PAYMENT_REQUEST, PAYMENT_REQUEST_FAIL, PAYMENT_REQUEST_SUCCESS } from "../Constant/PaymentConstant";

export const payment = (amount, bankCode, input) => async (dispatch) => {
    try {
        dispatch({
            type: PAYMENT_REQUEST,
        });

        // console.log({ amount, bankCode, ...input });

        // const config = {
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        // };

        const formData = new FormData();
        formData.append("amount", amount);
        formData.append("bankCode", bankCode);
        for (const property in input) {
            console.log(property, input[property]);
            formData.append(property, input[property]);
        }

        // for (var pair of formData.entries()) {
        //     console.log(pair[1]);
        // }

        const res = await httpFile.post("/payments/create_payment_url", formData);

        dispatch({
            type: PAYMENT_REQUEST_SUCCESS,
            payload: res.data,
        });

        window.location.href = res.data.data;
    } catch (error) {
        dispatch({
            type: PAYMENT_REQUEST_FAIL,
            payload: error?.response?.data?.message,
        });
    }
};
