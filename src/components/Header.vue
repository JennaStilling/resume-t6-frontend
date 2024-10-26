<template>
  <header class="header">
    <div class="logo-title">
      <router-link to="/">
        <img src="/src/assets/smallLogo.png" alt="ResuMate Logo" class="logo" />
      </router-link>
      <div class="title">Your AI resume builder</div>
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

<script>
export default {
  data() {
    return {
      menuOpen: false
    }
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    updateProfile() {
      this.$router.push('/contact-info');
      this.menuOpen = !this.menuOpen;
    },
    signOut() {
      // Add sign out logic later
      this.menuOpen = !this.menuOpen;
    }
  }
}
</script>

<style scoped>
.header {
  background-color: #65001F;
  color: #FFF;
  padding: 3px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
}

.logo-title {
  display: flex;
  align-items: center;
  text-indent: 10px;
  font-size: 18px;
  overflow: hidden;
}

.logo {
  width: 70px;
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
