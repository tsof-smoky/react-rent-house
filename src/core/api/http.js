import axios from "axios";
import { RRHConfig } from "../../config/RRHConfig";

export const httpFile = axios.create({
    baseURL: RRHConfig.REACT_APP_API_URL,
    withCredentials: false,
});

httpFile.interceptors.request.use(function (req) {
    req.headers["Content-Type"] = "multipart/form-data";
    const token = localStorage.getItem("accessToken");

    if (token && req.headers) req.headers["Authorization"] = `Bearer ${token}`;

    return req;
});
