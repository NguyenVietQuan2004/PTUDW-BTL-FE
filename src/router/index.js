import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Dashboard from "../views/Dashboard.vue";
import Admin from "../views/Admin.vue"; // Import trang admin
import Createbook from "../views/Createbook.vue";
import Createnxb from "../views/Createnxb.vue";
import Mybook from "../views/Mybook.vue";
import { useAuthStore } from "../stores/useAuthStore.js";
import { toRaw } from "vue";
import Updatebook from "../views/Updatebook.vue";
import TheoDoiMuonSach from "../views/TheoDoiMuonSach.vue";
import Users from "../views/Users.vue";

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/update-book/:id", component: Updatebook },
  { path: "/theo-doi-muon-sach", component: TheoDoiMuonSach },
  { path: "/users", component: Users },
  { path: "/dashboard", component: Dashboard, meta: { requiresAuth: true } },
  { path: "/admin", component: Admin, meta: { requiresAuth: true, adminOnly: true } },
  { path: "/create-book", component: Createbook, meta: { requiresAuth: true, adminOnly: true } },
  { path: "/create-nxb", component: Createnxb, meta: { requiresAuth: true, adminOnly: true } },
  {
    path: "/my-books",
    component: Mybook,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = !!toRaw(authStore.user);
  const isAdmin = toRaw(authStore.role) === "admin";

  if (isAuthenticated && (to.path === "/login" || to.path === "/register")) {
    next("/dashboard");
  } else if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  } else if (to.meta.adminOnly && !isAdmin) {
    next("/dashboard");
  } else {
    next();
  }
});

export default router;
