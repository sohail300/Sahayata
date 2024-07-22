import axios from "axios";

export const BACKEND_URL = "http://localhost:3000";
// export const BACKEND_URL='';

export const api = axios.create({
  baseURL: BACKEND_URL,
});
