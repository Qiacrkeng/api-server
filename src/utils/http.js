import { clearToken, getToken } from "@/utils/token.js";
import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3007/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

http.interceptors.request.use(
  (config) => {
    const token = getToken();
    // console.log(token);
    if (token) config.headers["Authorization"] = `${token}`;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => response,
  (error) => {
    // console.log(error);
    // token 過期或無身份權限
    if (error.response.status === 401) {
      clearToken();
      location.reload();
    }
  }
);
export default http;
