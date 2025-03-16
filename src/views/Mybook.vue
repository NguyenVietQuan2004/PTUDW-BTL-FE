<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "../stores/useAuthStore.js";
import { useTheoDoiMuonSachStore } from "../stores/useTheoDoiMuonSachStore.js";
import { useRouter } from "vue-router";

const userStore = useAuthStore();
const theoDoiMuonSachStore = useTheoDoiMuonSachStore();
const router = useRouter();
const borrowedBooks = ref([]);
const errorMessage = ref("");
const successMessage = ref("");

// 🛠️ Hàm định dạng ngày từ ISO → DD/MM/YYYY
const formatDate = (isoString) => {
  if (!isoString) return "Không xác định";
  const date = new Date(isoString);
  return date.toLocaleDateString("vi-VN");
};

// 🛒 Lấy danh sách sách đã mượn của user hiện tại
const fetchBorrowedBooks = async () => {
  try {
    await theoDoiMuonSachStore.fetchMuonSachByUser(userStore.user?.id);
    borrowedBooks.value = theoDoiMuonSachStore.userBorrowedBooks;
  } catch (error) {
    console.error("Lỗi tải sách đã mượn:", error);
    errorMessage.value = "Không thể tải danh sách sách đã mượn!";
  }
};

// 🔄 Trả sách
const returnBook = async (recordId) => {
  try {
    await theoDoiMuonSachStore.deleteMuonSach(recordId);
    successMessage.value = "Trả sách thành công!";
    setTimeout(() => (successMessage.value = ""), 3000);
    fetchBorrowedBooks(); // Cập nhật danh sách sau khi trả sách
  } catch (error) {
    console.error("Lỗi trả sách:", error);
    errorMessage.value = "Không thể trả sách!";
  }
};

onMounted(fetchBorrowedBooks);
</script>

<template>
  <div class="my-books-container">
    <h2 class="my-books-title">Sách Đã Mượn</h2>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
    <div v-if="borrowedBooks.length" class="book-list">
      <div v-for="book in borrowedBooks" :key="book.recordId" class="book-card">
        <div class="book-info">
          <h4 class="book-title">{{ book.tensach }}</h4>
          <p>
            Ngày mượn: <span class="highlight">{{ formatDate(book.ngaymuon) }}</span>
          </p>
          <p>
            Ngày trả: <span class="highlight">{{ formatDate(book.ngaytra) }}</span>
          </p>
          <!-- <button @click="returnBook(book.recordId)" class="return-button">🔄 Trả sách</button> -->
        </div>
      </div>
    </div>
    <p v-else class="no-books">📭 Bạn chưa mượn sách nào.</p>
    <button @click="router.push('/dashboard')" class="back-button">Quay lại</button>
  </div>
</template>

<style scoped>
.my-books-container {
  max-width: 800px;
  margin: 100px auto 40px;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.my-books-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.error-message {
  color: #d9534f;
  background: #f8d7da;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
}

.success-message {
  color: #155724;
  background: #d4edda;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
}

.book-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.book-card {
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: left;
  transition: transform 0.2s;
}

.book-card:hover {
  transform: translateY(-5px);
}

.book-info {
  margin-bottom: 10px;
}

.book-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.highlight {
  font-weight: bold;
  color: #007bff;
}

.no-books {
  font-size: 16px;
  color: #777;
  margin-top: 20px;
}

.return-button {
  margin-top: 10px;
  padding: 8px 12px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;
}

.return-button:hover {
  background: #c82333;
}

.back-button {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 15px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
}

.back-button:hover {
  background: #0056b3;
}
</style>
