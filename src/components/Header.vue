<template>
  <header class="header" v-if="currentRouteName !== 'login'">
    <div class="logo-title">
      <router-link to="/home">
        <img src="/src/assets/smallLogo.png" alt="ResuMate Logo" class="logo" />
      </router-link>
      <div class="title">OC Resume Builder</div>
    </div>

    <div class="user-menu">
      <!-- Home Menu -->
      <img src="/src/assets/home.png" alt="Home" class="user-icon" @click="toggleHomeMenu"
        @keydown.enter="toggleHomeMenu" role="button" tabindex="0" aria-haspopup="true" :aria-expanded="homeMenuOpen"
        style="width: 39px; height: 39px;" />
      <div v-if="homeMenuOpen" class="dropdown-menu" @click.stop>
        <ul>
          <li v-if="studentId != null" @click="updateHomePage('Student')">Student Home</li>
          <li v-if="reviewerId != null" @click="updateHomePage('Reviewer')">Reviewer Home</li>
          <li v-if="adminId != null" @click="updateHomePage('Admin')">Admin Home</li>
        </ul>
      </div>

      <!-- Profile Menu -->
      <img src="/src/assets/userIcon.png" alt="User" class="user-icon" @click="toggleProfileMenu"
        @keydown.enter="toggleProfileMenu" role="button" tabindex="0" aria-haspopup="true"
        :aria-expanded="profileMenuOpen" />
      <div v-if="profileMenuOpen" class="dropdown-menu" @click.stop>
        <ul>
          <li @click="updateProfile">Update Profile</li>
          <li @click="signOut">Sign Out</li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import Utils from "../config/utils";
import AuthServices from "../services/authServices";
import { useRouter, useRoute } from "vue-router";
import UserServices from "../services/userServices.js";

const user = ref(null);
const initials = ref("");
const name = ref("");
const menuOpen = ref(false);
const router = useRouter();
const studentId = ref("");
const adminId = ref("");
const reviewerId = ref("");

const homeMenuOpen = ref(false);
const profileMenuOpen = ref(false);

const route = useRoute();
const currentRouteName = computed(() => route.name);

// Close menu when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest(".user-menu")) {
    menuOpen.value = false;
  }
};

onMounted(() => {
  user.value = Utils.getStore("user");
  if (user.value) {
    initials.value = user.value.fName[0] + user.value.lName[0];
    name.value = user.value.fName + " " + user.value.lName;
  }
  getUserRoles();
  document.addEventListener("click", handleClickOutside);
  currentRouteName.value = computed(() => router.currentRoute.value.name)
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

const getUserRoles = async () => {
  try {
    user.value = Utils.getStore("user");
    const res = await UserServices.getUser(user.value.id);
    user.value = res.data;
    studentId.value = user.value.studentId;
    adminId.value = user.value.adminId;
    reviewerId.value = user.value.reviewerId;
  } catch (error) {
    console.error("Error fetching roles", error);
  }
};

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const updateProfile = () => {
  router.push("/contact-info");
  profileMenuOpen.value = false;
};

const updateHomePage = (loc) => {
  const roleMap = {
    Student: studentId,
    Reviewer: reviewerId,
    Admin: adminId,
  };
  if (roleMap[loc].value) {
    router.push({ name: `${loc.toLowerCase()}Home` });
    menuOpen.value = false;
  } else {
    console.error(`You do not have ${loc.toLowerCase()} permissions`);
  }
  homeMenuOpen.value = false;
};

const signOut = async () => {
  user.value = Utils.getStore("user");
  AuthServices.logoutUser(user.value)
    .then((response) => {
      console.log(response);
      Utils.removeItem("user");
      router.push({ name: "login" });
    })
    .catch((error) => {
      console.log("error", error);
    });
  profileMenuOpen.value = false;
};

const toggleHomeMenu = () => {
  homeMenuOpen.value = !homeMenuOpen.value;
  profileMenuOpen.value = false; // Close profile menu when home menu opens
};

const toggleProfileMenu = () => {
  profileMenuOpen.value = !profileMenuOpen.value;
  homeMenuOpen.value = false; // Close home menu when profile menu opens
};
</script>

<style scoped>
.header {
  background-color: #65001F;
  color: #FFF;
  padding-top: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.234);
  z-index: 1000;
  /* Ensure header is above other elements */
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

.user-menu,
.home-menu {
  position: relative;
}

.home-menu span {
  margin-left: 5px;
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
  z-index: 2000;
  /* Higher z-index to ensure dropdown is above everything */
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
</style>
