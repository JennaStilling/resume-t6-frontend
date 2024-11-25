import { createRouter, createWebHistory } from 'vue-router';
import ContactInfo from './components/userProfile/ContactInfo.vue';
import Education from './components/userProfile/Education.vue';
import Courses from './components/userProfile/Courses.vue';
import Experience from './components/userProfile/Experience.vue';
import Certifications from './components/userProfile/Certifications.vue';
import Skills from './components/userProfile/Skills.vue';
import Project from './components/userProfile/Project.vue';

import ViewResume from './views/ViewResume.vue';
import AddResume from './views/AddResume.vue';
import Login from './components/Login.vue';
import StudentHome from './views/StudentHome.vue'
import AdminHomePage from './views/admin/AdminHome.vue';
import ReviewerHomePage from './views/reviewer/ReviewerHome.vue';
import ReviewInbox from './components/reviewerPages/ReviewInbox.vue';
import ReviewResume from './components/reviewerPages/ReviewResume.vue';
//import path from 'path';

import HomePageRouter from './views/HomePageRouter.vue';
//import path from 'path';

// Define routes
const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', name: 'home', component: HomePageRouter },

  // Profile paths:
  { path: '/contact-info', component: ContactInfo },
  { path: '/education', component: Education },
  { path: '/education/edit', component: Education },
  { path: '/courses', component: Courses },
  { path: '/courses/select', component: Courses },
  { path: '/courses/select/edit', component: Courses },
  { path: '/experience', component: Experience },
  { path: '/experience/edit', component: Experience },
  { path: '/certifications', component: Certifications },
  { path: '/certifications/edit', component: Certifications },
  { path: '/skills', component: Skills },
  { path: '/skills/edit', component: Skills },
  { path: '/project', component: Project },
  { path: '/project/edit', component: Project },

  //Login/out: 
  { path: '/login', name: 'login', component: Login },
  { path: '/studentHome', name: 'studentHome', component: StudentHome },
  { path: '/resume/:id', name: 'resume', component: ViewResume, props: true },
  { path: '/add', name: 'addResume', component: AddResume },

  { path: '/review-inbox', name: 'review-inbox', component: ReviewInbox },
  { path: '/review-resume/:id', name: 'reviewResume', component: ReviewResume, props: true },
  { path: '/studentHome', name: 'studentHome', component: StudentHome },

  //dummy / temp routes for nav bar testing
  { path: '/reviewerHome', name: 'reviewerHome', component: ReviewerHomePage },
  { path: '/adminHome', name: 'adminHome', component: AdminHomePage },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
