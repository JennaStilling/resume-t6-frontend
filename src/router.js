import { createRouter, createWebHistory } from "vue-router";
import ListResume from "./views/ListResume.vue";
import ViewResume from "./views/ViewResume.vue";
import AddResume from "./views/AddResume.vue";
import EditResume from "./views/EditResume.vue";
import ViewProfile from "./views/ViewProfile.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "resumes",
      component: ListResume,
    },
    {
      path: "/resume/:id",
      name: "resume",
      component: ViewResume,
      props: true,
    },
    {
      path: "/add",
      name: "addResume",
      component: AddResume,
    },
    {
      path: "/edit/:id",
      name: "editResume",
      component: EditResume,
      props: true,
    },
    {
      path: "/profile",
      name: "profile",
      component: ViewProfile,
    },
  ],
});

export default router;