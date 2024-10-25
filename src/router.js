import { createRouter, createWebHistory } from "vue-router";

import Login from "./views/LoginTest.vue";
import goodTest from "./views/good.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
      path: "/good",
      name: "goodTest",
      component: goodTest,
    },
  ],
});

export default router;