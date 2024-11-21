<template>
  <header class="header">
    <div class="logo-title">
      <router-link to="/home">
        <img src="/src/assets/smallLogo.png" alt="ResuMate Logo" class="logo" />
      </router-link>
      <div class="title">OC Resume Builder</div>
    </div>

    <div class="nav-menu">
      Home Page
      <img src="/src/assets/userIcon.png" alt="Menu" class="menu-icon" @click="toggleNav" />
      <div v-if="navOpen" class="dropdown-nav-menu">
        <ul>
          <!-- <li @click="updateHomePage('Student')" v-if="studentId.value != null">Student Home</li>
          <li @click="updateHomePage('Reviewer')" v-if="reviewerId.value != null">Reviewer Home</li>
          <li @click="updateHomePage('Admin')" v-if="adminId.value != null">Admin Home</li> -->
          <li @click="updateHomePage('Student')">Student Home</li>
          <li @click="updateHomePage('Reviewer')">Reviewer Home</li>
          <li @click="updateHomePage('Admin')">Admin Home</li>
        </ul>
      </div>
    </div>

    <div class="user-menu">
      <img src="/src/assets/userIcon.png" alt="User" class="user-icon" @click="toggleMenu" />
      <div v-if="menuOpen" class="dropdown-menu">
        <ul>
          <li @click="updateProfile">Update Profile</li>
          <li @click="signOut">Sign Out</li>
        </ul>
      </div>
    </div>
  </header>
</template>



<script setup>
import { ref, onMounted } from "vue";
import Utils from "../config/utils";
import AuthServices from "../services/authServices";
import { useRouter } from "vue-router";
import UserServices from "../services/userServices.js";

const user = ref(null);
const initials = ref("");
const name = ref("");
const menuOpen = ref(false);
const router = useRouter();
const navOpen = ref(false);

const studentId = ref("");
const adminId = ref("");
const reviewerId = ref("");

onMounted(() => {
  // Load user data if available
  user.value = Utils.getStore("user");
  if (user.value) {
    initials.value = user.value.fName[0] + user.value.lName[0];
    name.value = user.value.fName + " " + user.value.lName;
  }
  console.log(user.value);

  getUserRoles();
});



const getUserRoles = () => {
  UserServices.getUser(user.value.userId)
    .then((res) => {
      user.value = res.data;
      console.log("ID: " + user.value.id);
      console.log("Student ID: " + user.value.studentId);
      console.log("Admin ID: " + user.value.adminId);
      console.log("Reviewer ID: " + user.value.reviewerId);

      studentId.value = user.value.studentId;
      adminId.value = user.value.adminId;
      reviewerId.value = user.value.reviewerId;

      if (studentId.value != null && adminId.value == null && reviewerId.value == null)
        router.push({ name: "studentHome" });
      else if (
        (adminId.value != null && studentId.value == null && reviewerId.value == null) ||
        (studentId.value != null && reviewerId.value != null && adminId.value != null) ||
        (studentId.value != null && adminId.value != null && reviewerId.value == null) ||
        (reviewerId.value != null && adminId.value != null && studentId.value == null)
      )
        router.push({ name: "adminHome" });
      else if (
        reviewerId.value != null &&
        adminId.value == null &&
        studentId.value == null
      )
        router.push({ name: "reviewerHome" });
      else console.log("User has not been assigned a role");
    })
    .catch((error) => {
      console.log("error", error);
    });
};


// Toggle the user menu display
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const toggleNav = () => {
  navOpen.value = !navOpen.value;
}

// Navigate to the profile update page
const updateProfile = () => {
  router.push("/contact-info");
  menuOpen.value = false;
};

const updateHomePage = (loc) => {
  if (loc === 'Student') {
    if (studentId.value != null) {
      navOpen.value = false;
      router.push({ name: "studentHome" });
    }
    else
      console.log("You do not have student permissions")
      navOpen.value = false;
  }
  else if (loc === 'Reviewer') {
    if (reviewerId.value != null) {
      navOpen.value = false;
      router.push({ name: "reviewerHome" });
    }
    else
      console.log("You do not have reviewer permissions")
      navOpen.value = false;
  }
  else if (loc === 'Admin') {
    if (adminId.value != null) {
      navOpen.value = false;
      router.push({ name: "adminHome" });
    }
    else
      console.log("You do not have admin permissions")
      navOpen.value = false;
  }
}

// Log out the current user
const signOut = () => {
  if (user.value) {
    AuthServices.logoutUser(user.value)
      .then((response) => {
        console.log(response);
        Utils.removeItem("user");
        router.push({ name: "login" });
      })
      .catch((error) => {
        console.log("error", error);
      });
  }
  menuOpen.value = false;
};
</script>

<style scoped>
.nav-menu {
  position: relative;
  margin-right: 2px;
  /* Spacing between nav-menu and user-menu */
}

.menu-icon {
  width: 50px;
  height: auto;
  margin-right: 10px;
  cursor: pointer;
}

.dropdown-nav-menu {
  position: absolute;
  right: 0;
  background-color: #65001F;
  z-index: 1000;
  color: white;
  border: 1px solid #53011a;
  box-shadow: 0 8px 16px rgba(182, 8, 8, 0.2);
  width: 150px;
}

.dropdown-nav-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown-nav-menu li {
  padding: 10px;
  border-bottom: 1px solid #53011a;
  cursor: pointer;
}

.dropdown-nav-menu li:hover {
  background-color: #8f042d;
}

.header {
  background-color: #65001F;
  color: #FFF;
  padding-top: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.234);
}

.logo-title {
  display: flex;
  align-items: center;
  text-indent: 10px;
  font-size: 17px;
  overflow: hidden;
}

.logo {
  width: 50px;
  height: auto;
  cursor: pointer;
}

.user-menu {
  position: relative;
}

.nav-menu {
  position: relative;
}

.user-icon {
  width: 50px;
  height: auto;
  margin-right: 10px;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  background-color: #65001F;
  z-index: 1000;
  color: white;
  border: 1px solid #53011a;
  box-shadow: 0 8px 16px rgba(182, 8, 8, 0.2);
  width: 150px;
  z-index: 1000;
}

.dropdown-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown-menu li {
  padding: 10px;
  border-bottom: 1px solid #53011a;
  cursor: pointer;
}

.dropdown-menu li:hover {
  background-color: #8f042d;
}

.dropdown-nav-menu {
  position: absolute;
  right: 0;
  background-color: #65001F;
  z-index: 1000;
  color: white;
  border: 1px solid #53011a;
  box-shadow: 0 8px 16px rgba(182, 8, 8, 0.2);
  width: 150px;
}

.dropdown-nav-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown-nav-menu li {
  padding: 10px;
  border-bottom: 1px solid #53011a;
  cursor: pointer;
}

.dropdown-nav-menu li:hover {
  background-color: #8f042d;
}
</style>