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
        let newTab = window.open();
        let loader = `<!DOCTYPE html>
        <html>
        <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
        .loader {
          border: 16px solid #f3f3f3;
          border-radius: 50%;
          border-top: 16px solid blue;
          border-right: 16px solid green;
          border-bottom: 16px solid red;
          border-left: 16px solid pink;
          width: 120px;
          height: 120px;
          -webkit-animation: spin 2s linear infinite; /* Safari */
          animation: spin 2s linear infinite;
          position: fixed;
          top:-100%; right:-100%; left:-100%; bottom:-100%;
          margin:auto;
          z-index:0;
        }
        /* Safari */
        @-webkit-keyframes spin {
          0% { -webkit-transform: rotate(0deg); }
          100% { -webkit-transform: rotate(360deg); }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        </style>
        </head>
        <body>
        
        <div class="loader"></div>
        
        </body>
        </html>
        `
        newTab.document.write(loader);
        const res = await httpFile.post("/payments/create_payment_url", formData);

        dispatch({
            type: PAYMENT_REQUEST_SUCCESS,
            payload: res.data,
        });

        newTab.location.href = res.data.data;
    } catch (error) {
        dispatch({
            type: PAYMENT_REQUEST_FAIL,
            payload: error?.response?.data?.message,
        });
    }
};
