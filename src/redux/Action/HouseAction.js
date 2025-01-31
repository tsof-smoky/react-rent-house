import axios from "axios";
import {
  HOUSE_LIST_FAIL,
  HOUSE_LIST_REQUEST,
  HOUSE_LIST_SUCCESS,
  HOUSE_DETAIL_FAIL,
  HOUSE_DETAIL_REQUEST,
  HOUSE_DETAIL_SUCCESS,
  HOUSE_CREATE_FAIL,
  HOUSE_CREATE_REQUEST,
  HOUSE_CREATE_SUCCESS,
  HOUSE_DELETE_FAIL,
  HOUSE_DELETE_REQUEST,
  HOUSE_DELETE_SUCCESS,
  HOUSE_UPDATE_FAIL,
  HOUSE_UPDATE_REQUEST,
  HOUSE_UPDATE_SUCCESS,
} from "../Constant/HouseConstant";

export const getHouseList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: HOUSE_LIST_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.get(`https://api-timnha.onrender.com/api/homes`, config);
    dispatch({
      type: HOUSE_LIST_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: HOUSE_LIST_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

export const getHouseDetail = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: HOUSE_DETAIL_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.get(
      `https://api-timnha.onrender.com/api/homes/${id}`,
      config
    );
    dispatch({
      type: HOUSE_DETAIL_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: HOUSE_DETAIL_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

export const updateHouse = (input) => async (dispatch, getState) => {
  try {
    dispatch({
      type: HOUSE_UPDATE_REQUEST,
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

    console.log(input);

    const formData = new FormData();
    for (const property in input) {
      if (property === "pictures") {
        input[property].forEach((el) => {
          formData.append(property, el);
        });
      } else if (property !== "_id") {
        formData.append(property, input[property]);
      }
    }

    const res = await axios.put(
      `https://api-timnha.onrender.com/api/homes/${input._id}`,
      formData,
      config
    );
    dispatch({
      type: HOUSE_UPDATE_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: HOUSE_UPDATE_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

export const createHouse = (input) => async (dispatch, getState) => {
  try {
    dispatch({
      type: HOUSE_CREATE_REQUEST,
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
      if (property !== "pictures") {
        formData.append(property, input[property]);
      } else {
        input[property].forEach((el) => {
          formData.append(property, el);
        });
      }
    }

    const res = await axios.post(
      `https://api-timnha.onrender.com/api/homes/`,
      formData,
      config
    );
    console.log(res);
    dispatch({
      type: HOUSE_CREATE_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: HOUSE_CREATE_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

export const deleteHouse = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: HOUSE_DELETE_REQUEST,
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
      `https://api-timnha.onrender.com/api/homes/${id}`,
      config
    );
    dispatch({
      type: HOUSE_DELETE_SUCCESS,
      payload: "Xóa thông tin nhà thành công",
    });
  } catch (error) {
    dispatch({
      type: HOUSE_DELETE_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};
