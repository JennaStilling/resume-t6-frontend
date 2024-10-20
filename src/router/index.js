import { createRouter, createWebHistory } from 'vue-router';

// Import your components
import ContactInfo from '../components/ContactInfo.vue';
import Education from '../components/Education.vue';
import Experience from '../components/Experience.vue';
import Certifications from '../components/Certifications.vue';
import Skills from '../components/Skills.vue';
import Project from '../components/Project.vue';

// Define routes
const routes = [
  { path: '/contact-info', component: ContactInfo },
  { path: '/education', component: Education },
  { path: '/experience', component: Experience },
  { path: '/certifications', component: Certifications },
  { path: '/skills', component: Skills },
  { path: '/project', component: Project },
  { path: '/', redirect: '/contact-info' } // Default
];

// Create and export router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;