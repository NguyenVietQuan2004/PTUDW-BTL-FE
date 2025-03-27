import axios from "axios";

const API_URL = "http://localhost:5000/api/theodoimuonsach";

export const createMuonSach = (data) => axios.post(`${API_URL}`, data);
export const getAllMuonSach = () => axios.get(`${API_URL}`);
export const getMuonSachById = (id) => axios.get(`${API_URL}/${id}`);
export const updateMuonSach = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteMuonSach = (id) => axios.delete(`${API_URL}/${id}`);
export const getMuonSachByUserId = (userId) => axios.get(`${API_URL}/user/${userId}`);
