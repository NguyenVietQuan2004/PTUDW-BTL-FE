import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const createBook = (bookData) => axios.post(`${API_URL}/sach`, bookData);
export const getAllBooks = () => axios.get(`${API_URL}/sach`);
export const getBookById = (id) => axios.get(`${API_URL}/sach/${id}`);
export const updateBook = (id, bookData) => axios.put(`${API_URL}/sach/${id}`, bookData);
export const deleteBook = (id) => axios.delete(`${API_URL}/sach/${id}`);
