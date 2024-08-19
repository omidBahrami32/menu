import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 5000,
  headers: {
    ContentType: "program/json",
  },
});

