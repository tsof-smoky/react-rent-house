import {
    STATISTICAL_FAIL,
    STATISTICAL_REQUEST,
    STATISTICAL_SUCCESS,
  } from "../Constant/StatisticalConstant";
  
export const statisticalReducer = (state = {}, action) => {
switch (action.type) {
    case STATISTICAL_REQUEST:
    return { data: null, loading: true, error: null };
    case STATISTICAL_SUCCESS:
    return { data: action.payload, loading: false, error: null };
    case STATISTICAL_FAIL:
    return { data: null, loading: false, error: action.payload };
    default:
    return state;
}
};