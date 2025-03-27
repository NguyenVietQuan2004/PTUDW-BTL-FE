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
    router.push("/dashboard");
  } catch (error) {
    alert(error);
  }
};

const goToRegister = () => {
  router.push("/register");
};
</script>

<template>
  <div class="login-container">
    <h2>Đăng nhập</h2>

    <!-- <div class="form-group">
      <label>Chọn vai trò:</label>
      <select v-model="role" @change="authStore.setRole(role)">
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
    </div> -->

    <div class="form-group">
      <input class="input" v-model="email" type="email" placeholder="Email" />
    </div>

    <div class="form-group">
      <input class="input" v-model="password" type="password" placeholder="Mật khẩu" />
    </div>

    <button @click="login">Đăng nhập</button>

    <button @click="goToRegister" class="register-button">Chưa có tài khoản? Đăng ký</button>
  </div>
</template>

<style scoped>
.input {
  max-width: 100%;
}
.login-container {
  width: 100%;
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  border-radius: 10px;
  margin-top: 200px;
  border: 1px solid black;
}
label {
  text-align: start;
  margin-right: auto;
}
h2 {
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
  overflow: hidden;
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
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.5s ease;
  background-color: transparent;
  border: 1px solid black;
}

button:hover {
  background-color: black;
  color: white;
}

.register-button {
  margin-top: 20px;
  padding: 0;
  border: none;
  text-align: start;
  font-size: 14px;
  text-decoration: underline;
  color: blue;
}

.register-button:hover {
  background-color: transparent;
  color: black;
  opacity: 0.6;
}
</style>
