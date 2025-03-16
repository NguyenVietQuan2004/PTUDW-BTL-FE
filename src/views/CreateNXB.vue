<script setup>
import { ref, onMounted } from "vue";
import { useCreatePublisherStore } from "../stores/useCreatePublisherStore.js";

const createPublisherStore = useCreatePublisherStore();

const tennxb = ref("");
const diachi = ref("");

const createPublisher = async () => {
  if (!tennxb.value) {
    alert("Vui lòng nhập tên nhà xuất bản!");
    return;
  }

  try {
    await createPublisherStore.createPublisher({
      tennxb: tennxb.value,
      diachi: diachi.value,
    });
    alert("Nhà xuất bản đã được thêm thành công!");
    tennxb.value = "";
    diachi.value = "";
    createPublisherStore.fetchPublishers(); // Cập nhật danh sách
  } catch (error) {
    alert(createPublisherStore.errorMessage);
  }
};

const deletePublisher = async (id) => {
  console.log(id);
  await createPublisherStore.deletePublisher(id);
  createPublisherStore.fetchPublishers();
};

onMounted(() => {
  createPublisherStore.fetchPublishers();
});
</script>

<template>
  <div class="container">
    <div class="form-container">
      <h2>Thêm Nhà Xuất Bản</h2>

      <div class="form-group">
        <label>Tên NXB:</label>
        <input v-model="tennxb" type="text" placeholder="Nhập tên NXB" />
      </div>

      <div class="form-group">
        <label>Địa chỉ:</label>
        <input v-model="diachi" type="text" placeholder="Nhập địa chỉ NXB" />
      </div>

      <button @click="createPublisher" :disabled="createPublisherStore.isLoading">
        {{ createPublisherStore.isLoading ? "Đang xử lý..." : "  Thêm Nhà Xuất Bản" }}
      </button>

      <p v-if="createPublisherStore.errorMessage" class="error-message">{{ createPublisherStore.errorMessage }}</p>
    </div>

    <div class="publisher-list">
      <h2>Danh Sách Nhà Xuất Bản</h2>
      <table>
        <thead>
          <tr>
            <th>TXB</th>
            <th>Địa Chỉ</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="publisher in createPublisherStore.publishers" :key="publisher.id">
            <td>{{ publisher.tennxb }}</td>
            <td>{{ publisher.diachi }}</td>
            <td>
              <button class="delete-btn" @click="deletePublisher(publisher._id)">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.publisher-list {
  width: 600px;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

th {
  background: #007bff;
  color: white;
}

td {
  text-align: center;
}

.delete-btn {
  background: red;
  color: white;
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;
}

.delete-btn:hover {
  background: darkred;
}

.container {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 100px;
}

.form-container {
  width: 400px;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
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

input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  box-sizing: border-box;
}

button {
  padding: 8px 12px;
  background: #007bff;
  color: white;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-left: 10px;
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

.publisher-list {
  max-width: 400px;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.publisher-list ul {
  list-style-type: none;
  padding: 0;
}

.publisher-list li {
  background: #f1f1f1;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.delete-btn {
  background: red;
  color: white;
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;
}

.delete-btn:hover {
  background: darkred;
}
</style>
