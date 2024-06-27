import axios from "axios";

const BASE_URL = 'https://c1cc-14-99-103-154.ngrok-free.app';

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;
// axiosInstance.defaults.withCredentials = true;

export default axiosInstance;