// src/lib/axios.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // Change to your API base path
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // optional: use this if you're using cookies or auth
});

export default axiosInstance;
