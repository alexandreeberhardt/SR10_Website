import { createWebHistory, createRouter } from "vue-router";
import HomeCandidat from "@/pages/HomeCandidat.vue";
import Login from "@/pages/Login.vue";

const routes = [
  {
    path: "/",
    name: "HomeCandidat",
    component: HomeCandidat,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
