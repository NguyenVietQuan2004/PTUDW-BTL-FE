<script setup>
import { ref, onMounted, computed, watch, toRaw } from "vue";
import { useTheoDoiMuonSachStore } from "../stores/useTheoDoiMuonSachStore.js";
import { useCreateBookStore } from "../stores/useCreateBookStore.js";
import { useAuthStore } from "../stores/useAuthStore.js";
import { useRoute } from "vue-router";

const theoDoiMuonSachStore = useTheoDoiMuonSachStore();
const bookStore = useCreateBookStore();
const authStore = useAuthStore();
const route = useRoute();

const masach = ref(route.query.bookId || "");
const madocgia = ref("");
const ngaymuon = ref("");
const ngaytra = ref("");
const searchQuery = ref("");
const searchDocGiaQuery = ref("");
const isBorrowed = ref(false); // Kiểm tra xem sách đã được mượn chưa
onMounted(async () => {
  await bookStore.fetchBooks();
  await authStore.fetchUsers();

  if (authStore.user?.role === "user") {
    madocgia.value = authStore.user.id;
    await fetchUserBorrowedBooks(); // Lấy danh sách sách đã mượn của user
  }
});

// Khi người dùng chọn độc giả hoặc sách, kiểm tra trạng thái mượn
watch([madocgia, masach], async () => {
  if (madocgia.value) {
    await fetchUserBorrowedBooks();
  }
  checkIfBookIsBorrowed();
});

// Lấy danh sách sách đã mượn của user
const fetchUserBorrowedBooks = async () => {
  if (madocgia.value) {
    await theoDoiMuonSachStore.fetchMuonSachByUser(madocgia.value);
    checkIfBookIsBorrowed();
  }
};

// Kiểm tra xem sách đã được mượn chưa
const checkIfBookIsBorrowed = () => {
  isBorrowed.value = theoDoiMuonSachStore.userBorrowedBooks.some((borrowedBook) => {
    console.log(borrowedBook.masach, masach.value);

    return borrowedBook.masach === masach.value;
  });
};

const createMuonSach = async () => {
  if (!madocgia.value || !masach.value || !ngaymuon.value || !ngaytra.value) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  if (isBorrowed.value) {
    alert("Bạn đã mượn sách này rồi, vui lòng trả trước khi mượn lại!");
    return;
  }

  try {
    await theoDoiMuonSachStore.createMuonSach({
      madocgia: madocgia.value,
      masach: masach.value,
      ngaymuon: ngaymuon.value,
      ngaytra: ngaytra.value,
    });

    alert("Đã thêm thành công!");
    masach.value = "";
    ngaymuon.value = "";
    ngaytra.value = "";
    searchQuery.value = "";
    isBorrowed.value = false;
  } catch (error) {
    alert(theoDoiMuonSachStore.errorMessage);
  }
};

// Lọc danh sách sách theo tên
const filteredBooks = computed(() =>
  bookStore.books.filter((book) => book.tensach.toLowerCase().includes(searchQuery.value.toLowerCase()))
);

// Lọc danh sách độc giả theo tên
const filteredDocGia = computed(() =>
  authStore.users.filter((user) => user.username.toLowerCase().includes(searchDocGiaQuery.value.toLowerCase()))
);
</script>

<template>
  <div class="form-container">
    <h2>Theo Dõi Mượn Sách</h2>

    <div class="form-group" v-if="authStore.user?.role !== 'user'">
      <label>Tìm độc giả:</label>
      <input v-model="searchDocGiaQuery" type="text" placeholder="Nhập tên độc giả để tìm..." />
    </div>

    <div class="form-group" v-if="authStore.user?.role !== 'user'">
      <label>Độc giả:</label>
      <select v-model="madocgia">
        <option value="" disabled>Chọn độc giả</option>
        <option v-for="user in filteredDocGia" :key="user._id" :value="user._id">
          {{ user.username }}
        </option>
        <option v-if="filteredDocGia.length === 0" disabled>Không tìm thấy độc giả nào</option>
      </select>
    </div>

    <!-- Ẩn tìm kiếm sách nếu có bookId -->
    <div class="form-group" v-if="!route.query.bookId">
      <label>Tìm sách:</label>
      <input v-model="searchQuery" type="text" placeholder="Nhập tên sách để tìm..." />
    </div>

    <!-- Ẩn select sách nếu có bookId -->
    <div class="form-group" v-if="!route.query.bookId">
      <label>Sách:</label>
      <select v-model="masach">
        <option value="" disabled>Chọn sách</option>
        <option v-for="book in filteredBooks" :key="book._id" :value="book._id">
          {{ book.tensach }}
        </option>
        <option v-if="filteredBooks.length === 0" disabled>Không tìm thấy sách nào</option>
      </select>
    </div>

    <div class="form-group">
      <label>Ngày mượn:</label>
      <input v-model="ngaymuon" type="date" />
    </div>

    <div class="form-group">
      <label>Ngày trả:</label>
      <input v-model="ngaytra" type="date" />
    </div>

    <button @click="createMuonSach" :disabled="theoDoiMuonSachStore.isLoading || isBorrowed">
      {{ isBorrowed ? "  Đang mượn" : theoDoiMuonSachStore.isLoading ? "Đang xử lý..." : "  Thêm" }}
    </button>

    <p v-if="isBorrowed" class="error-message">⚠️ Bạn đã mượn sách này, vui lòng trả trước khi mượn lại!</p>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin-top: 100px;
}

h2 {
  color: #333;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input,
select {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background: #007bff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:hover {
  background: #0056b3;
}

.error-message {
  color: red;
  font-weight: bold;
  margin-top: 10px;
}
</style>
