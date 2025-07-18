// src/lib/axios.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 👈 only if your backend uses cookies or auth sessions
});

export default axiosInstance;
