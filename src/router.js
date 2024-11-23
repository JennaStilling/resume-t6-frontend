import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./components/HomePage.vue";
import ContactInfo from "./components/userProfile/ContactInfo.vue";
import Education from "./components/userProfile/Education.vue";
import Experience from "./components/userProfile/Experience.vue";
import Certifications from "./components/userProfile/Certifications.vue";
import Skills from "./components/userProfile/Skills.vue";
import Project from "./components/userProfile/Project.vue";

import ProfileApp from "./profileApp.vue";
import ListResume from "./views/ListResume.vue";
import ViewResume from "./views/ViewResume.vue";
import AddResume from "./views/AddResume.vue";
import EditResume from "./views/EditResume.vue";
import ViewProfile from "./views/ViewProfile.vue";
import Login from "./components/Login.vue";
import Logout from "./views/LogoutTest.vue";
import StudentHome from "./views/StudentHome.vue";
import AdminHomePage from "./views/admin/AdminHome.vue";
import ReviewerHomePage from "./views/reviewer/ReviewerHome.vue";
import Cohere from "./views/CohereTest.vue";
import ReviewInbox from "./components/reviewerPages/ReviewInbox.vue";
import ReviewResume from "./components/reviewerPages/ReviewResume.vue";
import HomePageRouter from "./views/HomePageRouter.vue";

import Utils from "@/config/utils.js";
import UserServices from "@/services/userServices.js";
import { computed, ref } from "vue";

const user = computed(() => Utils.getStore("user"));

// Define routes
const routes = [
  { path: "/", name: "login", component: Login },
  { path: "/home", name: "home", component: HomePageRouter },

  // Profile paths:
  { path: "/contact-info", name: "contactInfo", component: ContactInfo },
  { path: "/education", name: "education", component: Education },
  { path: "/education/edit", name: "educationEdit", component: Education },
  { path: "/experience", name: "experience", component: Experience },
  { path: "/experience/edit", name: "experienceEdit", component: Experience },
  { path: "/certifications", name: "certifications", component: Certifications },
  { path: "/certifications/edit", name: "certificationsEdit", component: Certifications },
  { path: "/skills", name: "skills", component: Skills },
  { path: "/skills/edit", name: "skillsEdit", component: Skills },
  { path: "/project", name: "project", component: Project },
  { path: "/project/edit", name: "projectEdit", component: Project },

  //Login/out:
  { path: "/profile-app", name: "profile-app", component: ProfileApp },
  { path: "/login", name: "login", component: Login },
  { path: "/logout", name: "logout", component: Logout },
  { path: "/studentHome", name: "studentHome", component: StudentHome },
  { path: "/list", name: "resumes", component: ListResume },
  { path: "/resume/:id", name: "resume", component: ViewResume, props: true },
  { path: "/add", name: "addResume", component: AddResume },
  { path: "/edit/:id", name: "editResume", component: EditResume, props: true },
  { path: "/profile", name: "profile", component: ViewProfile },

  // Other:
  { path: "/review-inbox", name: "review-inbox", component: ReviewInbox },
  { path: "/review-resume/:id", name: "reviewResume", component: ReviewResume, props: true},
  { path: "/studentHome", name: "studentHome", component: StudentHome },

  { path: "/reviewerHome", name: "reviewerHome", component: ReviewerHomePage },
  { path: "/adminHome", name: "adminHome", component: AdminHomePage },
  { path: "/cohere-test", name: "cohere", component: Cohere },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from) => {
  const isAuthenticated = !!user.value;
  console.log("User:", user.value);

  const currentUser = ref({});

  if (isAuthenticated) {
    try {
      const res = await UserServices.getUser(user.value.userId);
      currentUser.value = res.data;
    } catch (error) { // just in case
      console.log("No user found");
      return { name: "login" };
    }
  }

  const isStudent = !!currentUser.value.studentId;
  const isAdmin = !!currentUser.value.adminId;
  const isReviewer = !!currentUser.value.reviewerId;

  const studentPages = [
    "studentHome",
    "resumes",
    "resume",
    "addResume",
    "editResume",
    "contactInfo",
    "education",
    "educationEdit",
    "experience",
    "experienceEdit",
    "certifications",
    "certificationsEdit",
    "skills",
    "skillsEdit",
    "project",
    "projectEdit",
  ];
  
  const adminPages = [
    "adminHome"
  ];

  const reviewerPages = [
    "reviewerHome", 
    "review-inbox", 
    "reviewResume"
  ];

  // not logged in
  if (!isAuthenticated && to.name !== "login") {
    return { name: "login" };
  }

  // logged in
  if (isAuthenticated) {
    // not a student
    if (!isStudent && studentPages.includes(to.name)) {
      console.log("Access denied to student page:", to.name);
      return { name: "home" };
    }

    // not an admin
    if (!isAdmin && adminPages.includes(to.name)) {
      console.log("Access denied to admin page:", to.name);
      return { name: "home" };
    }

    // not a reviewer
    if (!isReviewer && reviewerPages.includes(to.name)) {
      console.log("Access denied to reviewer page:", to.name);
      return { name: "home" };
    }

    // trying to go to the login page while logged in
    if (to.name === "login") {
      return { name: "home" };
    }
  }
});

export default router;
