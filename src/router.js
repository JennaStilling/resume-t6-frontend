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
});

export default router;
