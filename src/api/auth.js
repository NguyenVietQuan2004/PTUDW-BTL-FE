import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Thay URL backend của bạn

export const login = async (data, role) => {
  const endpoint = role === "user" ? "/user/login" : "/nhanvien/login";
  return await axios.post(`${API_URL}${endpoint}`, data);
};

export const register = async (data, role) => {
  const endpoint = role === "user" ? "/user/register" : "/nhanvien/register";
  return await axios.post(`${API_URL}${endpoint}`, data);
};
export const getAllUsers = async () => {
  return await axios.get(`${API_URL}/user/users`);
};
