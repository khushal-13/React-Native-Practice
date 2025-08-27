import axios from "axios";

// Create axios instance with base URL
const api = axios.create({
  baseURL: "http://192.168.1.100:3000", // fixed part
});

export default api;
