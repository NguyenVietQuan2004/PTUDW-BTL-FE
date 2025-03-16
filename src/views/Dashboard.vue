<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/useAuthStore.js";
import { useCreateBookStore } from "../stores/useCreateBookStore.js";
import { useTheoDoiMuonSachStore } from "../stores/useTheoDoiMuonSachStore.js";

const router = useRouter();
const userStore = useAuthStore();
const bookStore = useCreateBookStore();
const theoDoiMuonSachStore = useTheoDoiMuonSachStore();
const errorMessage = ref("");
const successMessage = ref("");
const searchQuery = ref(""); // Biến lưu nội dung tìm kiếm

// 🛒 Lấy danh sách sách
onMounted(async () => {
  try {
    await bookStore.fetchBooks();
  } catch (error) {
    console.error("Lỗi tải danh sách sách:", error);
    errorMessage.value = "Không thể tải danh sách sách!";
  }
});

//    Lọc danh sách sách theo tên
const filteredBooks = computed(() => {
  return bookStore.books.filter((book) => book.tensach.toLowerCase().includes(searchQuery.value.toLowerCase()));
});

//   Đăng ký mượn sách
const registerBook = async (bookId) => {
  try {
    router.push({ path: "/theo-doi-muon-sach", query: { bookId } });
    successMessage.value = "Đăng ký thành công!";
    setTimeout(() => (successMessage.value = ""), 3000);
    await bookStore.fetchBooks(); // Cập nhật danh sách sau khi đăng ký
  } catch (error) {
    console.error("Lỗi đăng ký sách:", error);
    errorMessage.value = "Không thể đăng ký sách!";
    setTimeout(() => (errorMessage.value = ""), 3000);
  }
};
</script>

<template>
  <div class="my-books-container">
    <h2 class="my-books-title">Danh Sách Sách</h2>

    <input v-model="searchQuery" type="text" placeholder="🔍 Tìm sách theo tên..." class="search-input" />

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>

    <div v-if="filteredBooks.length" class="book-list">
      <div v-for="book in filteredBooks" :key="book.id" class="book-card">
        <div class="book-info">
          <h4 class="book-title">{{ book.tensach }}</h4>
          <p>
            Năm xuất bản: <span class="highlight">{{ book.namxuatban }}</span>
          </p>
          <p>
            Giá: <span class="highlight">{{ book.dongia.toLocaleString() }} VNĐ</span>
          </p>
          <p>
            Số lượng: <span class="highlight">{{ book.soquyen }}</span>
          </p>
        </div>
        <button @click="registerBook(book._id)" :disabled="book.soquyen === 0" class="register-button">Đăng ký</button>
      </div>
    </div>
    <p v-else class="no-books">📭 Không có sách nào.</p>

    <button @click="router.push('/dashboard')" class="back-button">Quay lại</button>
  </div>
</template>

<style scoped>
.my-books-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin-top: 100px;
}

.my-books-title {
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  color: #333;
}

.search-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.error-message {
  color: red;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
}

.success-message {
  color: green;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
}

.book-list {
  margin-top: 20px;
}

.book-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f9f9f9;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.book-info p {
  margin: 5px 0;
  color: #555;
}

.book-title {
  font-size: 18px;
  font-weight: bold;
  color: #222;
}

.highlight {
  font-weight: bold;
  color: #007bff;
}

.register-button {
  background: #007bff;
  color: white;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;
}

.register-button:hover {
  background: #0056b3;
}

.register-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.back-button {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}
</style>
