<script setup>
import { ref, onMounted, watchEffect, toRaw } from "vue";
import { useCreateBookStore } from "../stores/useCreateBookStore.js";
import { useCreatePublisherStore } from "../stores/useCreatePublisherStore.js";
import { useRouter } from "vue-router";
import navigationAdmin from "../components/navigationAdmin.vue";
const router = useRouter();
const createBookStore = useCreateBookStore();
const createPublisherStore = useCreatePublisherStore();

const tensach = ref("");
const dongia = ref("");
const soquyen = ref("");
const namxuatban = ref("");
const manxb = ref("");

onMounted(async () => {
  await createPublisherStore.fetchPublishers();
  await createBookStore.fetchBooks();
});

const createBook = async () => {
  if (!tensach.value || !dongia.value || !soquyen.value || !namxuatban.value || !manxb.value) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  try {
    await createBookStore.createBook({
      tensach: tensach.value,
      dongia: parseInt(dongia.value),
      soquyen: parseInt(soquyen.value),
      namxuatban: parseInt(namxuatban.value),
      manxb: manxb.value,
    });

    alert("Sách đã được thêm thành công!");
    await createBookStore.fetchBooks();
    tensach.value = "";
    dongia.value = "";
    soquyen.value = "";
    namxuatban.value = "";
    manxb.value = "";
  } catch (error) {
    alert(createBookStore.errorMessage);
  }
};

const updateBook = (book) => {
  router.push(`/update-book/${book._id}`);
};

const deleteBook = async (bookId) => {
  if (confirm("Bạn có chắc chắn muốn xóa sách này không?")) {
    await createBookStore.deleteBook(bookId);
    await createBookStore.fetchBooks();
  }
};
</script>

<template>
  <navigationAdmin />
  <div style="display: flex; flex-direction: column; margin-top: 20px">
    <div class="form-container">
      <h2>Thêm Sách Mới</h2>

      <div class="form-group">
        <label>Tên sách:</label>
        <input v-model="tensach" type="text" placeholder="Nhập tên sách" />
      </div>

      <div class="form-group">
        <label>Đơn giá:</label>
        <input v-model="dongia" type="number" placeholder="Nhập đơn giá" />
      </div>

      <div class="form-group">
        <label>Số lượng:</label>
        <input v-model="soquyen" type="number" placeholder="Nhập số lượng" />
      </div>

      <div class="form-group">
        <label>Năm xuất bản:</label>
        <input v-model="namxuatban" type="number" placeholder="Nhập năm xuất bản" />
      </div>

      <div class="form-group">
        <label>Nhà xuất bản:</label>
        <select v-model="manxb">
          <option value="">-- Chọn nhà xuất bản --</option>
          <option v-for="publisher in createPublisherStore.publishers" :key="publisher.id" :value="publisher._id">
            {{ publisher.tennxb }}
          </option>
        </select>
      </div>

      <button @click="createBook" :disabled="createBookStore.isLoading">
        {{ createBookStore.isLoading ? "Đang xử lý..." : "  Thêm Sách" }}
      </button>

      <p v-if="createBookStore.errorMessage" class="error-message">⚠️ {{ createBookStore.errorMessage }}</p>
    </div>

    <div class="book-list">
      <h2>Danh Sách Sách</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Tên sách</th>
            <th>Đơn giá</th>
            <th>Số lượng</th>
            <th>Năm xuất bản</th>
            <th>NXB</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(book, index) in createBookStore.books" :key="book._id">
            <td>{{ index + 1 }}</td>
            <td>{{ book.tensach }}</td>
            <td>{{ book.dongia }}</td>
            <td>{{ book.soquyen }}</td>
            <td>{{ book.namxuatban }}</td>
            <td>
              {{
                createPublisherStore.publishers.find((publisher) => publisher._id === book.manxb)?.tennxb || "Không rõ"
              }}
            </td>
            <td>
              <button class="update-btn" @click="updateBook(book)">Sửa</button>
              <button class="delete-btn" @click="deleteBook(book._id)">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.form-container {
  width: 400px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  border: 1px solid black;
}

h2 {
  color: #333;
  margin-bottom: 20px;
  text-align: center;
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
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  box-sizing: border-box;
}

button {
  width: 60%;
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

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.error-message {
  color: red;
  margin-top: 10px;
}

.book-list {
  width: 1200px;
  margin: 20px auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: left;
}

th {
}

.update-btn {
  background: #ffc107;
  color: black;
  padding: 5px 10px;
  margin-right: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.update-btn:hover {
  background: #e0a800;
}

.delete-btn {
  background: #dc3545;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.delete-btn:hover {
  background: #c82333;
}
</style>
