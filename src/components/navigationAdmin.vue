<script setup>
import { useRouter } from "vue-router";
import navigationAdmin from "../components/navigationAdmin.vue";

const router = useRouter();
</script>

<template>
  <div style="margin-top: 100px">
    <button @click="router.push('/create-book')" class="btn btn-primary">Thêm Sách</button>
    <button @click="router.push('/create-nxb')" class="btn btn-secondary">Thêm NXB</button>
    <button @click="router.push('/theo-doi-muon-sach')" class="btn btn-warning">Theo Dõi Mượn Sách</button>
    <button @click="router.push('/users')" class="btn btn-warning">Danh sách người dùng</button>
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
  background-image: linear-gradient(to right, #8360c3, #2ebf91);
  color: white;
  font-size: 14px;
  padding: 10px;
  font-weight: 600;
}
.btn-danger:hover {
}
.list {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
}
.book-card {
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  border: 1px solid black;
  min-width: 450px;
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
