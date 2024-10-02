import axios from "axios";
const token = localStorage.getItem("token");

const apiClient = axios.create({
    baseURL: "http://localhost:1813",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  export default apiClient