<template>
  <header class="header">
    <div class="logo-title">
      <router-link to="/">
        <img src="/src/assets/smallLogo.png" alt="ResuMate Logo" class="logo" />
      </router-link>
      <div class="title">OC resume builder</div>
    </div>
    <div class="user-menu">
      <img
        src="/src/assets/userIcon.png"
        alt="User"
        class="user-icon"
        @click="toggleMenu"
      />
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
import { ref } from "vue";
import Utils from "../config/utils";
import AuthServices from "../services/authServices";
import { useRouter } from "vue-router";

const user = ref(null);
const initials = ref("");
const name = ref("");
const menuOpen = ref(false);
const router = useRouter();

// Load user data if available
user.value = Utils.getStore("user");
if (user.value) {
  initials.value = user.value.fName[0] + user.value.lName[0];
  name.value = user.value.fName + " " + user.value.lName;
}
console.log(user.value);

// Toggle the user menu display
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

// Navigate to the profile update page
const updateProfile = () => {
  router.push("/contact-info");
  menuOpen.value = false;
};

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
</style>