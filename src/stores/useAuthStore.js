import { defineStore } from "pinia";
import { login, register } from "../api/auth";
import { getAllUsers } from "../api/auth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    role: localStorage.getItem("role") || "user",
    users: [],
  }),
  actions: {
    async loginUser(credentials) {
      try {
        const response = await login(credentials, this.role);
        this.user = response.data.data;
        localStorage.setItem("user", JSON.stringify(this.user));
        localStorage.setItem("role", this.role);
        return response.data;
      } catch (error) {
        console.error("Login error:", error);
        throw error.response?.data?.message || "Đăng nhập thất bại!";
      }
    },

    async registerUser(credentials) {
      try {
        const response = await register(credentials, this.role);
        this.user = response.data.data;
        localStorage.setItem("user", JSON.stringify(this.user));
        localStorage.setItem("role", this.role);
        return response.data;
      } catch (error) {
        console.error("Register error:", error);
        throw error.response?.data?.message || "Đăng ký thất bại!";
      }
    },

    async fetchUsers() {
      try {
        const response = await getAllUsers();
        this.users = response.data.data;
      } catch (error) {
        console.error("Lỗi khi lấy danh sách người dùng:", error);
      }
    },

    setRole(role) {
      if (role === "user" || role === "admin") {
        this.role = role;
        localStorage.setItem("role", role);
      } else {
        console.warn("Vai trò không hợp lệ!");
      }
    },

    logout() {
      this.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("role");
    },
  },
});
