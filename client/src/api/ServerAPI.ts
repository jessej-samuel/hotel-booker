import axios from "axios";

const ServerAPI = axios.create({
  baseURL: "http://localhost:5000",
});

export default ServerAPI;

// /auth/user/login
// /auth/user/register
// /auth/hotel/login
// /auth/hotel/register