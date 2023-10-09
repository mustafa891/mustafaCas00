import axios from "axios";

export const { BACKEND_URL } = window;

const clientAxios = axios.create({
  baseURL:
    process.env.REACT_APP_MODE === "development"
      ? process.env.REACT_APP_BACKEND_URL
      : BACKEND_URL,
  //baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  method: "POST",
});

export default clientAxios;
