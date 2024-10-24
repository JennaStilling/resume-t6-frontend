import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import ContactInfo from '../components/userProfile/ContactInfo.vue';
import Education from '../components/userProfile/Education.vue';
import Experience from '../components/userProfile/Experience.vue';
import Certifications from '../components/userProfile/Certifications.vue';
import Skills from '../components/userProfile/Skills.vue';
import Project from '../components/userProfile/Project.vue';

// Define routes
const routes = [
  { path: '/', component: HomePage }, 
  { path: '/contact-info', component: ContactInfo },
  { path: '/education', component: Education },
  { path: '/experience', component: Experience },
  { path: '/certifications', component: Certifications },
  { path: '/skills', component: Skills },
  { path: '/project', component: Project }
];

// Create and export router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;