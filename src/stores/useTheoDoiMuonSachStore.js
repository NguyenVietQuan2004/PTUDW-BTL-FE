import { defineStore } from "pinia";
import {
  createMuonSach,
  getAllMuonSach,
  getMuonSachById,
  updateMuonSach,
  deleteMuonSach,
  getMuonSachByUserId,
} from "../api/theodoimuonsach";

export const useTheoDoiMuonSachStore = defineStore("theoDoiMuonSach", {
  state: () => ({
    muonSachList: [],
    muonSach: null,
    isLoading: false,
    errorMessage: "",
    userBorrowedBooks: [],
  }),

  actions: {
    async createMuonSach(data) {
      try {
        this.isLoading = true;
        const response = await createMuonSach(data);
        this.muonSachList.push(response.data);
        return response.data;
      } catch (error) {
        this.errorMessage = "Lỗi khi tạo mượn sách!";
        throw new Error(this.errorMessage);
      } finally {
        this.isLoading = false;
      }
    },
    async fetchMuonSachByUser(userId) {
      try {
        this.isLoading = true;
        const response = await getMuonSachByUserId(userId);
        this.userBorrowedBooks = response.data.data;
      } catch (error) {
        this.userBorrowedBooks = [];
        this.errorMessage = "Không thể lấy danh sách sách đã mượn!";
      } finally {
        this.isLoading = false;
      }
    },
    async fetchMuonSach() {
      try {
        this.isLoading = true;
        const response = await getAllMuonSach();
        this.muonSachList = response.data.data;
      } catch (error) {
        this.errorMessage = "Không thể tải danh sách mượn sách!";
      } finally {
        this.isLoading = false;
      }
    },

    async fetchMuonSachById(id) {
      try {
        this.isLoading = true;
        const response = await getMuonSachById(id);
        this.muonSach = response.data;
      } catch (error) {
        this.errorMessage = "Không thể tải thông tin mượn sách!";
      } finally {
        this.isLoading = false;
      }
    },

    async updateMuonSach(id, data) {
      try {
        this.isLoading = true;
        const response = await updateMuonSach(id, data);
        this.muonSachList = this.muonSachList.map((item) => (item.id === id ? response.data : item));
        return response.data;
      } catch (error) {
        this.errorMessage = "Cập nhật mượn sách thất bại!";
      } finally {
        this.isLoading = false;
      }
    },

    async deleteMuonSach(id) {
      try {
        this.isLoading = true;
        await deleteMuonSach(id);
        this.muonSachList = this.muonSachList.filter((item) => item.id !== id);
      } catch (error) {
        this.errorMessage = "Xóa mượn sách thất bại!";
      } finally {
        this.isLoading = false;
      }
    },
  },
});
