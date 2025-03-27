import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const login = async (data, role) => {
  const endpoint = "/user/login";
  return await axios.post(`${API_URL}${endpoint}`, data);
};

export const register = async (data) => {
  const endpoint = "/user/register";
  return await axios.post(`${API_URL}${endpoint}`, data);
};
export const getAllUsers = async () => {
  return await axios.get(`${API_URL}/user/users`);
};
