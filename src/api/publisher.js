import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const createPublisher = (publisherData) => axios.post(`${API_URL}/nhaxuatban`, publisherData);
export const getAllPublishers = () => axios.get(`${API_URL}/nhaxuatban`);
export const deletePublisher = (id) => axios.delete(`${API_URL}/nhaxuatban/${id}`);
