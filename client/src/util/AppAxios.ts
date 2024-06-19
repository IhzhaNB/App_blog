import axios from "axios";

const AppAxios = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export default AppAxios;
