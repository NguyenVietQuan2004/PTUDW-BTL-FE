<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCreateBookStore } from "../stores/useCreateBookStore.js";
import { useCreatePublisherStore } from "../stores/useCreatePublisherStore.js";

const route = useRoute();
const router = useRouter();
const createBookStore = useCreateBookStore();
const createPublisherStore = useCreatePublisherStore();

const bookId = route.params.id;
const tensach = ref("");
const dongia = ref("");
const soquyen = ref("");
const namxuatban = ref("");
const manxb = ref("");

onMounted(async () => {
  await createPublisherStore.fetchPublishers();
  await createBookStore.fetchBooks();

  const book = createBookStore.books.find((b) => b._id === bookId);
  if (book) {
    tensach.value = book.tensach;
    dongia.value = book.dongia;
    soquyen.value = book.soquyen;
    namxuatban.value = book.namxuatban;
    manxb.value = book.manxb;
  } else {
    alert("Không tìm thấy sách!");
    router.push("/");
  }
});

const updateBook = async () => {
  if (!tensach.value || !dongia.value || !soquyen.value || !namxuatban.value || !manxb.value) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }
  try {
    await createBookStore.updateBook(bookId, {
      tensach: tensach.value,
      dongia: parseInt(dongia.value),
      soquyen: parseInt(soquyen.value),
      namxuatban: parseInt(namxuatban.value),
      manxb: manxb.value,
    });
    alert("Cập nhật thành công!");
    router.push("/");
  } catch (error) {
    alert("Lỗi khi cập nhật sách!");
  }
};
</script>

<template>
  <div class="form-container">
    <h2>✏️ Cập Nhật Sách</h2>
    <div class="form-group">
      <label>Tên sách:</label>
      <input v-model="tensach" type="text" />
    </div>
    <div class="form-group">
      <label>Đơn giá:</label>
      <input v-model="dongia" type="number" />
    </div>
    <div class="form-group">
      <label>Số lượng:</label>
      <input v-model="soquyen" type="number" />
    </div>
    <div class="form-group">
      <label>Năm xuất bản:</label>
      <input v-model="namxuatban" type="number" />
    </div>
    <div class="form-group">
      <label>Nhà xuất bản:</label>
      <select v-model="manxb">
        <option v-for="publisher in createPublisherStore.publishers" :key="publisher._id" :value="publisher._id">
          {{ publisher.tennxb }}
        </option>
      </select>
    </div>
    <button @click="updateBook">✅ Cập Nhật</button>
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
.form-group {
  margin-bottom: 15px;
  text-align: left;
}
input,
select {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}
button {
  width: 100%;
  padding: 10px;
  background: #28a745;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background: #218838;
}
</style>
