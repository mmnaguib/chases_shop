import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `https://chasesshopback-production.up.railway.app/api/`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
