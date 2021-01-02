import axios from "axios";

// create instance
let API = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  responseType: "json",
});

// set headers
API.defaults.headers.get["Accept"] = "application/json";
API.defaults.headers["Access-Control-Allow-Origin"] = "*";

// request intercepter
API.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// responce intercepter
API.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error.response.data);
  }
);

export default API;
  