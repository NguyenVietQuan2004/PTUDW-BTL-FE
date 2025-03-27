<script setup>
import { ref, onMounted, computed, toRaw } from "vue";
import { useAuthStore } from "../stores/useAuthStore.js";
import navigationAdmin from "../components/navigationAdmin.vue";
const authStore = useAuthStore();
const searchQuery = ref("");

onMounted(async () => {
  await authStore.fetchUsers();
});

const filteredUsers = computed(() => {
  return authStore.users.filter((user) => user.username.toLowerCase().includes(searchQuery.value.toLowerCase()));
});
</script>

<template>
  <navigationAdmin />
  <div class="container">
    <h2 class="title">Danh Sách Người Dùng</h2>
    <input v-model="searchQuery" placeholder="Tìm kiếm người dùng..." class="search-input" />
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
  margin: 40px auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  margin-top: 20px;
  padding: 0 200px;
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
.user-item:hover {
  background-color: #f8f6f6;
}
.user-item {
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 5px;
}

.no-users {
  text-align: center;
  color: #777;
  font-style: italic;
}
</style>
