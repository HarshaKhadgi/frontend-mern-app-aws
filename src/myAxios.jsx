import axios from "axios";

const myAxios = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "/api",
});
export default myAxios;
