<script setup>
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "../stores/useAuthStore";

const router = useRouter();
const authStore = useAuthStore();
const route = useRoute();
console.log(route.path);
const logout = () => {
  authStore.logout();
  router.push("/login");
};
console.log(authStore.role);
</script>

<template>
  <nav class="navbar">
    <div class="logo">
      <h2>Quản Lý Sách</h2>
    </div>
    <ul class="nav-links">
      <li><router-link to="/dashboard">Trang chủ ✨</router-link></li>

      <li v-if="authStore.user && authStore.role === 'admin'">
        <router-link to="/admin"> Quản lý</router-link>
      </li>

      <li v-if="authStore.user && authStore.role === 'user'">
        <router-link to="/my-books"> Sách của tôi</router-link>
      </li>
    </ul>

    <button v-if="authStore.user" @click="logout" class="logout-btn">Đăng Xuất</button>
    <button v-if="!authStore.user" class="logout-btn">
      <router-link to="/login" style="color: white; text-decoration: none"> Đăng Nhập</router-link>
    </button>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #ddd;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  background-color: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(8px);
  z-index: 20;
}

/* Logo */
.logo h2 {
  margin: 0;
  font-size: 22px;
  font-weight: bold;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 20px;
  margin-left: auto;
  margin-right: 30px;
}

.nav-links li {
  display: flex;
  color: black;
  align-items: end;
}

.nav-links a {
  color: black;
  text-decoration: none;
  font-size: 16px;
  border-radius: 6px;
  font-weight: 600;
  transition: background 0.3s;
}

.nav-links a:hover {
  background: rgba(255, 255, 255, 0.2);
}

.logout-btn {
  color: white;

  align-items: center;
  background-color: rgb(32, 33, 36);
  border-radius: 20px;
  border: none;
  cursor: pointer;
  opacity: 1;
  display: inline-flex;
  height: 36px;
  padding: 0px 24px;
  transition: 0.3s;
  white-space: nowrap;
  width: fit-content;
}

.logout-btn:hover {
  opacity: 0.6;
}
</style>
