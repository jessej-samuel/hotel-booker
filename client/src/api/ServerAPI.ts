import axios from "axios";

const ServerAPI = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    // cors
    "Access-Control-Allow-Origin": "*",
  },
});

export default ServerAPI;

// /auth/user/login
// /auth/user/register
// /auth/hotel/login
// /auth/hotel/register
