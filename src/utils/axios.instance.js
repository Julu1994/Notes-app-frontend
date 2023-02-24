import axios from "axios";

const BASE_URL = "http://63.35.212.223:8181/api/v1";
export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});
