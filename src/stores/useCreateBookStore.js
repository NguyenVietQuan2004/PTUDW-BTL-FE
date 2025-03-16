import { defineStore } from "pinia";
import { createBook, getAllBooks, getBookById, updateBook, deleteBook } from "../api/book";

export const useCreateBookStore = defineStore("createBook", {
  state: () => ({
    books: [],
    book: null,
    isLoading: false,
    errorMessage: "",
  }),

  actions: {
    async createBook(bookData) {
      try {
        this.isLoading = true;
        const response = await createBook(bookData);
        console.log(response);
        this.books.push(response.data);
        return response.data;
      } catch (error) {
        this.errorMessage = error.response?.data?.message || "Lỗi khi tạo sách!";
        throw new Error(this.errorMessage);
      } finally {
        this.isLoading = false;
      }
    },

    async fetchBooks() {
      try {
        this.isLoading = true;
        const response = await getAllBooks();
        this.books = response.data.data;
      } catch (error) {
        this.errorMessage = "Không thể tải danh sách sách!";
      } finally {
        this.isLoading = false;
      }
    },

    async fetchBookById(id) {
      try {
        this.isLoading = true;
        const response = await getBookById(id);
        this.book = response.data;
      } catch (error) {
        this.errorMessage = "Không thể tải thông tin sách!";
      } finally {
        this.isLoading = false;
      }
    },

    async updateBook(id, bookData) {
      try {
        this.isLoading = true;
        const response = await updateBook(id, bookData);
        this.books = this.books.map((book) => (book.id === id ? response.data : book));
        return response.data;
      } catch (error) {
        this.errorMessage = "Cập nhật sách thất bại!";
      } finally {
        this.isLoading = false;
      }
    },

    async deleteBook(id) {
      try {
        this.isLoading = true;
        await deleteBook(id);
        this.books = this.books.filter((book) => book.id !== id);
      } catch (error) {
        this.errorMessage = "Xóa sách thất bại!";
      } finally {
        this.isLoading = false;
      }
    },
  },
});
