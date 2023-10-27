import axios from "axios";
import {
  STATISTICAL_FAIL,
  STATISTICAL_REQUEST,
  STATISTICAL_SUCCESS,
} from "../Constant/StatisticalConstant";

export const getStatistical = (dates) => async (dispatch, getState) => {
  try {
    dispatch({
      type: STATISTICAL_REQUEST,
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
    const data = {
      dates: dates,
      user: [],
      house: [],
      order: [],
    };

    const getUserStat = async () => {
      // const axiosList = [];
      // dates.forEach((date) =>
      //   axiosList.push(
      //     axios.get(`http://localhost:3443/api/users/search?df=${date}`, config)
      //   )
      // );
      // const res = await Promise.all(axiosList);
      // return res.map((r) => r.data.results);

      const res = await axios.get(
        `https://api-timnha.onrender.com/api/users/search?df=${dates[0]}..${
          dates[dates.length - 1]
        }`,
        config
      );
      return res.data.results.map((obj) => obj.quantity);
    };

    const getHouseStat = async () => {
      // const axiosList = [];
      // dates.forEach((date) =>
      //   axiosList.push(
      //     axios.get(`http://localhost:3443/api/homes/date?df=${date}`, config)
      //   )
      // );
      // const res = await Promise.all(axiosList);
      // return res.map((r) => r.data.results);
      const res = await axios.get(
        `https://api-timnha.onrender.com/api/homes/date?df=${dates[0]}..${
          dates[dates.length - 1]
        }`,
        config
      );
      return res.data.results.map((obj) => obj.quantity);
    };

    const getOrderStat = async () => {
      // const axiosList = [];
      // dates.forEach((date) =>
      //   axiosList.push(
      //     axios.get(
      //       `http://localhost:3443/api/orders/search?df=${date}`,
      //       config
      //     )
      //   )
      // );
      // const res = await Promise.all(axiosList);
      // return res.map((r) => r.data.results);
      const res = await axios.get(
        `https://api-timnha.onrender.com/api/orders/search?df=${dates[0]}..${
          dates[dates.length - 1]
        }`,
        config
      );
      return res.data.results.map((obj) => obj.quantity);
    };

    data.user = await getUserStat();
    data.house = await getHouseStat();
    data.order = await getOrderStat();
    console.log(data);

    dispatch({
      type: STATISTICAL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: STATISTICAL_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};
