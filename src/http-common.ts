import axios, { AxiosInstance } from "axios";
const apiClient: AxiosInstance = axios.create({
  baseURL: "http://192.168.1.110:8888/",
  headers: {
    "Content-type": "application/json",
  },
});
export default apiClient;