// This file is used to configure axios for the application
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5001",
});

export default axiosInstance;
