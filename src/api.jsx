import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL + "/api/auth" : "http://localhost:5000",
});

export default API;
