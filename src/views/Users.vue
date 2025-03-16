<script setup>
import { ref, onMounted, computed, toRaw } from "vue";
import { useAuthStore } from "../stores/useAuthStore.js";

const authStore = useAuthStore();
const searchQuery = ref("");

onMounted(async () => {
  await authStore.fetchUsers();
  console.log(toRaw(authStore.users));
});

const filteredUsers = computed(() => {
  return authStore.users.filter((user) => user.username.toLowerCase().includes(searchQuery.value.toLowerCase()));
});
</script>

<template>
  <div class="container">
    <h2 class="title">👤 Danh Sách Người Dùng</h2>
    <input v-model="searchQuery" placeholder="🔍 Tìm kiếm người dùng..." class="search-input" />
    <div v-if="filteredUsers.length">
      <ul class="user-list">
        <li v-for="user in filteredUsers" :key="user._id" class="user-item">
          <span>{{ user.username }} - {{ user.email }}</span>
        </li>
      </ul>
    </div>
    <p v-else class="no-users">🚫 Không tìm thấy người dùng nào.</p>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin-top: 100px;
}

.title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 15px;
}

.user-list {
  list-style: none;
  padding: 0;
}

.user-item {
  background: #f9f9f9;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 5px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
}

.no-users {
  text-align: center;
  color: #777;
  font-style: italic;
}
</style>
