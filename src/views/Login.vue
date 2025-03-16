<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/useAuthStore.js";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();
const email = ref("");
const password = ref("");
const role = ref(authStore.role);

const login = async () => {
  if (!email.value || !password.value) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  try {
    await authStore.loginUser({ email: email.value, password: password.value });
    router.push("/dashboard"); // Chuyển hướng sau khi đăng nhập thành công
  } catch (error) {
    alert(error);
  }
};

// 🔄 Chuyển đến trang đăng ký
const goToRegister = () => {
  router.push("/register");
};
</script>

<template>
  <div class="login-container">
    <h2>Đăng nhập</h2>

    <div class="form-group">
      <label>Chọn vai trò:</label>
      <select v-model="role" @change="authStore.setRole(role)">
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
    </div>

    <div class="form-group">
      <input class="input" v-model="email" type="email" placeholder="Email" />
    </div>

    <div class="form-group">
      <input class="input" v-model="password" type="password" placeholder="Mật khẩu" />
    </div>

    <button @click="login">Đăng nhập</button>

    <!-- 🌟 Nút chuyển đến trang đăng ký -->
    <button @click="goToRegister" class="register-button">Chưa có tài khoản? Đăng ký</button>
  </div>
</template>

<style scoped>
/* Định dạng toàn bộ trang đăng nhập */
.input {
  max-width: 100%;
}
.login-container {
  width: 100%;
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-top: 100px;
}
label {
  text-align: start;
  margin-right: auto;
}
/* Tiêu đề */
h2 {
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

/* Nhóm input */
.form-group {
  margin-bottom: 15px;
  overflow: hidden;
}

/* Input và select */
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

/* Nút đăng nhập */
button {
  width: 100%;
  padding: 10px;
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

/* 🌟 Nút đăng ký */
.register-button {
  margin-top: 10px;
  background: #28a745;
}

.register-button:hover {
  background: #218838;
}
</style>
