<<<<<<< HEAD
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './components/HomePage.vue';
import ContactInfo from './components/userProfile/ContactInfo.vue';
import Education from './components/userProfile/Education.vue';
import Experience from './components/userProfile/Experience.vue';
import Certifications from './components/userProfile/Certifications.vue';
import Skills from './components/userProfile/Skills.vue';
import Project from './components/userProfile/Project.vue';

// Define routes
const routes = [
  { path: '/', component: HomePage },
  { path: '/contact-info', component: ContactInfo },
  { path: '/education', component: Education },
  { path: '/education/edit', component: Education },
  { path: '/experience', component: Experience },
  { path: '/experience/edit', component: Experience },
  { path: '/certifications', component: Certifications },
  { path: '/certifications/edit', component: Certifications },
  { path: '/skills', component: Skills },
  { path: '/skills/edit', component: Skills },
  { path: '/project', component: Project },
  { path: '/project/edit', component: Project }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
=======
import { createRouter, createWebHistory } from "vue-router";
import ListResume from "./views/ListResume.vue";
import ViewResume from "./views/ViewResume.vue";
import AddResume from "./views/AddResume.vue";
import EditResume from "./views/EditResume.vue";
import ViewProfile from "./views/ViewProfile.vue";

import Login from "./views/LoginTest.vue";
import Logout from "./views/LogoutTest.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/logout",
      name: "logout",
      component: Logout,
    },
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
>>>>>>> dev
});

export default router;
