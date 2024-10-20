<template>
  <div id="app">
    <Header />
    <NavBar :currentTab="currentTab" />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import NavBar from './components/NavBar.vue';

export default {
  components: {
    Header,
    NavBar,
  },
  computed: {
    currentTab() {
      const routeToTabName = {
        '/contact-info': 'Contact Info',
        '/education': 'Education',
        '/experience': 'Experience',
        '/certifications': 'Certifications',
        '/skills': 'Skills',
        '/project': 'Project'
      };
      return routeToTabName[this.$route.path] || 'Contact Info'; // Default to Contact Info
    }
  }
};
</script>

<style>
#app {
  font-family: 'Helvetica', sans-serif;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #021E2C;
}
</style>