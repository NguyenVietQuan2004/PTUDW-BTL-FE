<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/useAuthStore.js";

const router = useRouter();
const authStore = useAuthStore();

const username = ref("");
const email = ref("");
const password = ref("");
const role = ref("user"); // Luôn là "user"

const register = async () => {
  if (!username.value || !email.value || !password.value) {
    alert("Vui lòng nhập đầy đủ thông tin");
    return;
  }

  try {
    await authStore.registerUser({
      username: username.value,
      email: email.value,
      password: password.value,
      role: role.value, // Role luôn là "user"
    });

    alert("Đăng ký thành công");
    router.push("/login");
  } catch (error) {
    alert(error);
  }
};

// 🔄 Chuyển đến trang đăng nhập
const goToLogin = () => {
  router.push("/login");
};
</script>

<template>
  <div class="container">
    <div class="register-box">
      <h2>Đăng ký</h2>

      <!-- ✅ Ẩn role, mặc định là "user" -->
      <input v-model="username" placeholder="Họ và tên" />
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Mật khẩu" />

      <button @click="register">Đăng ký</button>

      <!-- 🌟 Nút quay lại đăng nhập -->
      <button @click="goToLogin" class="login-button">Quay lại Đăng nhập</button>
    </div>
  </div>
</template>

<style scoped>
/* Tổng thể layout */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 100px);
  background-color: #f4f4f4;
  box-sizing: border-box;
  margin-top: 100px;
}

/* Box đăng ký */
.register-box {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: center;
}

/* Tiêu đề */
h2 {
  margin-bottom: 20px;
  color: #333;
}

/* Input */
input {
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
}

/* Nút đăng ký */
button {
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
}

button:hover {
  background: #0056b3;
}

/* 🌟 Nút quay lại đăng nhập */
.login-button {
  background: #28a745;
}

.login-button:hover {
  background: #218838;
}
</style>
