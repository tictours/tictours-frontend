import axios from "axios";
import { store } from "../store/store";

const  createCustomInstance = (type="application/json") => {
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": type,
    // 'Authorization': `Bearer ${authToken}`, // Include the token in the "Authorization" header
  },
});

axiosInstance.interceptors.request.use((config) => {
  const state = store.getState();
  const authToken = state.auth.auth.data.token;
  // config.params = config.params || {};
  // config.params['auth'] = token;

  // If an authentication token exists, add it to the request headers
  if (authToken) {
    config.headers["Authorization"] = `Bearer ${authToken}`;
  }

  return config;
});
return axiosInstance
}
const formDataType =  "multipart/form-data"
const responseBody = (response) => response.data;
export const axiosPost = (url, data) =>
  createCustomInstance().post(url, data).then(responseBody);
export const filePost = (url, data) =>
  createCustomInstance(formDataType).post(url, data).then(responseBody);
export const axiosPut = (url, data) =>
  createCustomInstance().put(url, data).then(responseBody);
export const axiosDelete = (url, data) =>
  createCustomInstance().delete(url).then(responseBody);

export default createCustomInstance;
