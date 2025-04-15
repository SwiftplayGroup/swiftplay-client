import axios from "axios";

export const api = axios.create({
  baseURL: "https://swiftplay.onrender.com", //This is for prod
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});
