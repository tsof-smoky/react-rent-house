import axios from "axios";
import {
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_DETAIL_FAIL,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_UPDATE_FAIL,
  ORDER_UPDATE_REQUEST,
  ORDER_UPDATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
} from "../Constant/OrderConstant";

export const getOrderList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
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
    const res = await axios.get(`https://api-timnha.onrender.com/api/orders`, config);

    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

export const getOrderDetail = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAIL_REQUEST,
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
    const res = await axios.get(
      `https://api-timnha.onrender.com/api/orders/${id}`,
      config
    );
    dispatch({
      type: ORDER_DETAIL_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAIL_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

export const createOrder = (input) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });
    const {
      userLogin: { user },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    };

    const formData = new FormData();
    for (const property in input) {
      formData.append(property, input[property]);
    }

    const res = await axios.post(
      `https://api-timnha.onrender.com/api/users/order`,
      formData,
      config
    );
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: res.data.message,
    });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

export const updateOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_UPDATE_REQUEST,
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
    const res = await axios.put(
      `https://api-timnha.onrender.com/api/orders/${id}`,
      {
        //
      },
      config
    );
    dispatch({
      type: ORDER_UPDATE_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_UPDATE_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

export const deleteOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DELETE_REQUEST,
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
    const res = await axios.delete(
      `https://api-timnha.onrender.com/api/orders/${id}`,
      config
    );
    dispatch({
      type: ORDER_DELETE_SUCCESS,
      payload: "Xóa yêu cầu tìm bạn cùng phòng thành công",
    });
  } catch (error) {
    dispatch({
      type: ORDER_DELETE_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};
