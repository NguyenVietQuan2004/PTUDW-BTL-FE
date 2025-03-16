import { defineStore } from "pinia";
import { createPublisher, getAllPublishers, deletePublisher } from "../api/publisher";

export const useCreatePublisherStore = defineStore("createPublisher", {
  state: () => ({
    publishers: [],
    publisher: { tennxb: "", diachi: "" },
    isLoading: false,
    errorMessage: "",
    successMessage: "",
  }),

  actions: {
    async createPublisher(publisherData) {
      try {
        this.isLoading = true;
        const response = await createPublisher(publisherData);
        this.publishers.push(response.data);
        this.successMessage = "Tạo nhà xuất bản thành công!";
        return response.data;
      } catch (error) {
        this.errorMessage = error.response?.data?.message || "Lỗi khi tạo nhà xuất bản!";
      } finally {
        this.isLoading = false;
      }
    },

    async fetchPublishers() {
      try {
        this.isLoading = true;
        const response = await getAllPublishers();
        this.publishers = response.data.data;
      } catch (error) {
        this.errorMessage = "Không thể tải danh sách nhà xuất bản!";
      } finally {
        this.isLoading = false;
      }
    },

    async deletePublisher(id) {
      try {
        const confirmDelete = confirm("Bạn có chắc chắn muốn xóa nhà xuất bản này?");
        if (!confirmDelete) return;

        this.isLoading = true;
        await deletePublisher(id);
        this.publishers = this.publishers.filter((publisher) => publisher.id !== id);
        this.successMessage = "Xóa nhà xuất bản thành công!";
      } catch (error) {
        this.errorMessage = error.response?.data?.message || "Không thể xóa nhà xuất bản!";
      } finally {
        this.isLoading = false;
      }
    },
  },
});
