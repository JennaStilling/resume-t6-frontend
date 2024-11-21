<template>
  <header class="header">
    <div class="logo-title">
      <router-link to="/home">
        <img src="/src/assets/smallLogo.png" alt="ResuMate Logo" class="logo" />
      </router-link>
      <div class="title">OC Resume Builder</div>
    </div>

    <div class="user-menu">
      <img
        src="/src/assets/userIcon.png"
        alt="User"
        class="user-icon"
        @click="toggleMenu"
        @keydown.enter="toggleMenu"
        role="button"
        tabindex="0"
        aria-haspopup="true"
        aria-expanded="menuOpen"
      />
      <div v-if="menuOpen" class="dropdown-menu" @click.stop>
        <ul>
          <li @click="updateProfile">Update Profile</li>
          <li @click="updateHomePage('Student')">Student Home</li>
          <li @click="updateHomePage('Reviewer')">Reviewer Home</li>
          <li @click="updateHomePage('Admin')">Admin Home</li>
          <li @click="signOut">Sign Out</li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import Utils from "../config/utils";
import AuthServices from "../services/authServices";
import { useRouter } from "vue-router";
import UserServices from "../services/userServices.js";

const user = ref(null);
const initials = ref("");
const name = ref("");
const menuOpen = ref(false);
const router = useRouter();

const studentId = ref("");
const adminId = ref("");
const reviewerId = ref("");

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
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

const getUserRoles = async () => {
  try {
    const res = await UserServices.getUser(user.value.userId);
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
  menuOpen.value = false;
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
};

const signOut = async () => {
  if (user.value) {
    try {
      await AuthServices.logoutUser(user.value);
      Utils.removeItem("user");
      router.push({ name: "login" });
    } catch (error) {
      console.error("Error logging out", error);
    }
  }
  menuOpen.value = false;
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
  z-index: 1000; /* Ensure header is above other elements */
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
  z-index: 2000; /* Higher z-index to ensure dropdown is above everything */
  color: white;
  border: 1px solid #53011a;
  box-shadow: 0 8px 16px rgba(182, 8, 8, 0.2);
  width: 150px;
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
