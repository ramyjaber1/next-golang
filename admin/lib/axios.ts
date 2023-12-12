
import axios from "axios";
const API_URL = process.env.API_URL;
let config = {
  baseURL: API_URL,
  timeout: 5000,
  withCredentials: true,
};


export const _axios = axios.create(config);
