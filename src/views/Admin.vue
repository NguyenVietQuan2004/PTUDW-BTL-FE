<script setup>
import { ref, onMounted, computed, toRaw } from "vue";
import { useRouter } from "vue-router";
import { useTheoDoiMuonSachStore } from "../stores/useTheoDoiMuonSachStore.js";
import { useCreateBookStore } from "../stores/useCreateBookStore.js";
import { useAuthStore } from "../stores/useAuthStore.js";

const router = useRouter();
const theoDoiMuonSachStore = useTheoDoiMuonSachStore();
const bookStore = useCreateBookStore();
const authStore = useAuthStore();

onMounted(async () => {
  await bookStore.fetchBooks();
  await authStore.fetchUsers();
  await theoDoiMuonSachStore.fetchMuonSach();
});
const formatDateCustom = (isoString) => {
  if (!isoString) return "Không xác định";
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const booksWithBorrowers = computed(() => {
  return bookStore.books
    .map((book) => {
      const nguoiMuon = (theoDoiMuonSachStore.muonSachList || [])
        .filter((record) => record.masach === book._id)
        .map((record) => {
          const user = authStore.users.find((u) => u._id === record.madocgia);
          return {
            id: record._id,
            ten: user ? user.username : "Không xác định",
            ngayMuon: record.ngaymuon,
            ngayTra: record.ngaytra,
          };
        });

      return { ...book, nguoiMuon };
    })
    .filter((book) => book.nguoiMuon.length > 0);
});

const traSach = async (recordId) => {
  const isConfirmed = window.confirm("Bạn có chắc chắn muốn trả sách này không?");
  if (!isConfirmed) return;
  try {
    await theoDoiMuonSachStore.deleteMuonSach(recordId);
    await theoDoiMuonSachStore.fetchMuonSach();
    await bookStore.fetchBooks();
  } catch (error) {
    console.error("Lỗi khi trả sách:", error);
  }
};
</script>

<template>
  <div class="" style="margin-top: 100px">
    <button @click="router.push('/create-book')" class="btn btn-primary">Thêm Sách</button>
    <button @click="router.push('/create-nxb')" class="btn btn-secondary">Thêm NXB</button>
    <button @click="router.push('/theo-doi-muon-sach')" class="btn btn-warning">Theo Dõi Mượn Sách</button>
    <button @click="router.push('/users')" class="btn btn-warning">Danh sách người dùng</button>
  </div>
  <div class="container">
    <h2 class="title">Quản lý Mượn Sách</h2>

    <div v-if="booksWithBorrowers.length" class="list">
      <div v-for="book in booksWithBorrowers" :key="book._id" class="book-card">
        <h3 class="book-title">Tên sách: {{ book.tensach }}</h3>
        <p class="book-info">Xuất bản: {{ book.namxuatban }}</p>
        <!-- <p class="book-info">Số lượng còn lại: {{ book.soquyen - book.nguoiMuon.length }}</p> -->
        <p class="book-info">Số lượng còn lại: {{ book.soquyen }}</p>
        <div v-if="book.nguoiMuon.length" class="borrowers">
          <h4 class="borrowers-title">Người đã mượn:</h4>
          <ul>
            <li v-for="user in book.nguoiMuon" :key="user._id" class="borrower-item">
              <span>{{ user.ten }} ({{ formatDateCustom(user.ngayMuon) }} - {{ formatDateCustom(user.ngayTra) }})</span>
              <button @click="traSach(user.id)" class="btn btn-danger">Trả sách</button>
            </li>
          </ul>
        </div>
        <p v-else class="no-borrowers">Chưa có ai mượn sách này.</p>
      </div>
    </div>
    <p v-else class="no-books">Không có sách nào.</p>
  </div>
</template>

<style scoped>
.container {
  margin: 40px auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin-top: 40px;
}

.title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.btn {
  padding: 10px 16px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  background-color: transparent;
  color: rgb(63, 63, 246);
  text-decoration: none;
}

.btn-primary {
}
.btn-primary:hover {
}
.btn-secondary {
}
.btn-secondary:hover {
}
.btn-danger {
  text-decoration: none;
  font-size: 14px;
  padding: 10px;
  font-weight: 600;
  color: white;
  background-color: #333;
  border: 1px solid transparent;
}
.btn-danger:hover {
  background-color: white;
  color: black;
  border: 1px solid black;
  box-sizing: border-box;
}
.list {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: start;
}
.book-card {
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  border: 1px solid black;
  min-width: 400px;
}
ul {
  padding: 0;
}
.book-title {
  font-size: 22px;
  font-weight: bold;
  color: #333;
}

.borrowers {
  margin-top: 10px;
}
.borrowers-title {
  font-weight: bold;
  margin-bottom: 5px;
}
.borrower-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 8px;
  border-radius: 5px;
  margin-top: 5px;
  border: 1px solid black;
}

.no-borrowers,
.no-books {
  text-align: center;
  color: #777;
}
</style>
