import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://9b1c-14-99-103-154.ngrok-free.app',
  withCredentials: false,
  headers: {
  'ngrok-skip-browser-warning': true
  }
  });

axiosInstance.interceptors.request.use(
  (config:any) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      config.headers["ngrok-skip-browser-warning"] = true;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;


