<script setup>
import { ref, computed, onMounted, toRaw } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/useAuthStore.js";
import { useCreateBookStore } from "../stores/useCreateBookStore.js";

const router = useRouter();
const userStore = useAuthStore();
const bookStore = useCreateBookStore();
const errorMessage = ref("");
const successMessage = ref("");
const searchQuery = ref("");
const selectedNXB = ref(null);
console.log(bookStore.books);

onMounted(async () => {
  try {
    await bookStore.fetchBooks();
  } catch (error) {
    console.error("Lỗi tải danh sách sách:", error);
    errorMessage.value = "Không thể tải danh sách sách!";
  }
});

const uniqueNXBs = computed(() => {
  const nxbSet = new Set(bookStore.books.map((book) => book.nxb_info?.tennxb));
  return Array.from(nxbSet);
});

const filteredBooks = computed(() => {
  return bookStore.books.filter((book) => {
    const matchTitle = book.tensach.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchNXB = selectedNXB.value ? book.nxb_info?.tennxb === selectedNXB.value : true;
    return matchTitle && matchNXB;
  });
});

const registerBook = async (bookId) => {
  try {
    router.push({ path: "/theo-doi-muon-sach", query: { bookId } });
    successMessage.value = "Đăng ký thành công!";
    setTimeout(() => (successMessage.value = ""), 3000);
    await bookStore.fetchBooks();
  } catch (error) {
    console.error("Lỗi đăng ký sách:", error);
    errorMessage.value = "Không thể đăng ký sách!";
    setTimeout(() => (errorMessage.value = ""), 3000);
  }
};
</script>

<template>
  <div class="wrapper" style="margin-top: 77px; font-family: Arial, Helvetica, sans-serif">
    <div class="filter">
      <div style="display: flex; justify-content: space-between; align-items: center">
        <h3>Nhà Xuất Bản</h3>
      </div>
      <ul class="nxb-list">
        <li @click="selectedNXB = null">Xem tất cả</li>
        <li v-for="nxb in uniqueNXBs" :key="nxb" @click="selectedNXB = nxb" :class="{ active: selectedNXB === nxb }">
          {{ nxb }}
        </li>
      </ul>
    </div>
    <div class="my-books-container">
      <input v-model="searchQuery" type="text" placeholder="Tìm sách theo tên..." class="search-input" />
      <h2 class="my-books-title">Thư viện sách</h2>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
      <div v-if="filteredBooks.length" class="book-list">
        <div v-for="book in filteredBooks" :key="book.id" class="product-card">
          <div class="product-info">
            <!-- <img
              src="data:image/jpeg;base64,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"
              alt=""
            /> -->
            <h4 class="product-title line-1 highlight" style="margin-bottom: 10px">{{ book.tensach }}</h4>
            <p class="nxb" style="font-size: 15px">
              Tên NXB: <span class="" style="font-weight: 600; font-size: 15px">{{ book?.nxb_info?.tennxb }}</span>
            </p>
            <p style="font-size: 15px">
              Năm xuất bản: <span class="" style="font-weight: 600; font-size: 15px">{{ book.namxuatban }}</span>
            </p>
            <p style="font-size: 15px">
              Giá:
              <span class="" style="font-weight: 600; font-size: 15px"
                >{{ book.dongia.toLocaleString() }} <span style="font-size: 16px">VNĐ</span>
              </span>
            </p>
            <p style="font-size: 15px">
              Số lượng: <span class="" style="font-weight: 600; font-size: 15px">{{ book.soquyen }}</span>
            </p>
            <button
              v-if="!(userStore.role === 'admin')"
              @click="registerBook(book._id)"
              :disabled="book.soquyen === 0"
              class="action-button"
            >
              Đăng ký
            </button>
          </div>
        </div>
      </div>
      <p v-else class="no-books">Không có sách nào.</p>

      <div class="list-card" style="margin-top: 100px"></div>
    </div>
    <div class="footer">
      <div class="f-item">
        <span style="font-weight: 600"> Giới thiệu:</span>
        <br />
        <div style="margin-top: 10px; font-style: italic">
          Website Quản Lý Mượn Sách giúp bạn dễ dàng tìm kiếm, đăng ký mượn và theo dõi tình trạng sách. Hệ thống hỗ trợ
          quản lý sách, người dùng và lịch sử mượn trả một cách hiệu quả. Trải nghiệm ngay để quản lý thư viện thuận
          tiện hơn!
        </div>
      </div>
      <div class="f-item">
        <span style="font-weight: 600"> Liên hệ:</span>
        <div style="margin-top: 10px; font-style: italic">Số điện thoại: 0763948610</div>
        <div style="font-style: italic">Email: nguyenvietquan.30032004@gmail.com</div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.list-card {
  display: flex;
  gap: 200px;
}
.card {
  flex: 1;
}
.filter {
  flex: 1;
  font-size: 18px;
  font-weight: 600;
  border-right: 2px solid #ddd;
}
.filter {
  flex: 1;
  background-color: rgb(240, 236, 236);
  font-size: 24px;
  font-weight: 600;
  min-height: 100vh;
  color: #333;
}
.line-1 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
h3 {
  margin-top: 0;
  background-color: rgb(46, 181, 181);
  color: white;
  padding: 16px 0;
  width: 100%;
  text-align: center;
}
.nxb-list {
  margin-top: 0;
}
.nxb-list li {
  padding: 10px;
  cursor: pointer;
  transition: background 0.3s;
  font-size: 18px;
}
.nxb-list li:hover,
.nxb-list li.active {
  opacity: 0.7;
  text-decoration: underline;
}
.clear-filter {
  margin-top: 10px;
  padding: 5px 10px;
  border: none;
  background: red;
  color: white;
  cursor: pointer;
}
</style>
<style scoped>
/* Container chính */
.my-books-container {
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  font-size: 18px;
  flex: 4;
}
.nxb {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.f-item {
  width: 50%;
  padding: 0 80px;
  font-size: 14px;
}
.wrapper {
  display: flex;
  gap: 10px;
  padding: 0 20px;
  flex-wrap: wrap;
}
.footer {
  display: flex;
  width: 100%;
  border-top: 1px solid black;
  margin-top: 100px;
  padding: 20px;
}

h4 {
  margin: 0;
}
.product-info {
  text-align: start;
}
.my-books-title {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  text-align: center;
}

.search-input {
  width: 100%;
  max-width: 300px;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.error-message {
  color: red;
  font-weight: bold;
  margin-top: 10px;
}

.success-message {
  color: green;
  font-weight: bold;
  margin-top: 10px;
}

.book-list {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: start;
  align-items: start;
}

.product-card {
  width: 260px;
  justify-content: center;
  align-items: center;
  border: 1px solid #ddd;
  background: white;
  overflow: hidden;
  flex-direction: column;
  border-radius: 8px;
  position: relative;
  transition: transform 0.2s ease-in-out, box-shadow 0.3s ease-in-out;
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
}

.img {
  aspect-ratio: 1 / 1;
  width: 100%;
  object-fit: cover;
  border-radius: 5px;
}

.product-info p {
  margin: 5px 0;
  color: #555;
}
.product-info {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-self: self-start;
  height: 100%;
  padding: 16px;
}
.product-title {
  font-size: 18px;
  font-weight: bold;
  color: #222;
}

.highlight {
  font-weight: bold;
  font-size: 20px;
  color: #3e9bff;
}

/* Nút đăng ký */
.action-button {
  background: #007bff;
  color: white;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s ease-in-out;
  margin-top: 10px;
}

.action-button:hover {
  background: #0056b3;
}

.action-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.no-books {
  font-size: 18px;
  font-weight: bold;
  color: #888;
  margin-top: 20px;
}
</style>
