<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/useAuthStore.js";

const router = useRouter();
const authStore = useAuthStore();

const username = ref("");
const email = ref("");
const password = ref("");
const role = ref("user");

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
      role: role.value,
    });

    alert("Đăng ký thành công");
    router.push("/login");
  } catch (error) {
    alert(error);
  }
};

const goToLogin = () => {
  router.push("/login");
};
</script>

<template>
  <div class="container">
    <div class="register-box">
      <h2>Đăng ký</h2>

      <input v-model="username" placeholder="Họ và tên" />
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Mật khẩu" />

      <button @click="register">Đăng ký</button>

      <button @click="goToLogin" class="login-button back">Quay lại Đăng nhập</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  box-sizing: border-box;
}

.register-box {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  text-align: center;
  border: 1px solid black;
}

h2 {
  margin-bottom: 20px;
  color: #333;
}

input {
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
}

button:hover {
  background: #0056b3;
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
.back {
  margin-top: 20px;
  padding: 0;
  border: none;
  text-align: start;
  font-size: 14px;
  text-decoration: underline;
  color: blue;
}
.back:hover {
  background-color: transparent;
  color: black;
  opacity: 0.6;
}
</style>
