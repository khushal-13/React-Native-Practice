import axios from "axios";

// Create axios instance with base URL
const api = axios.create({
    baseURL: "http://192.168.1.106:3000",
});

export default api;