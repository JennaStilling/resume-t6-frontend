<!-- src/App.vue -->
<template>
  <div id="app">
    <Header />
    <!--Don't show Header on HomePage -->
    <NavBar v-if="!isHomePage" :currentTab="currentTab" />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import NavBar from './components/NavBar.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

export default {
  components: {
    Header,
    NavBar,
  },
  setup() {
    const route = useRoute();
    
    // Check if the current route is the root homepage
    const isHomePage = computed(() => route.path === '/');

    // Define the currentTab based on route path
    const currentTab = computed(() => {
      const routeToTabName = {
        '/contact-info': 'Contact Info',
        '/education': 'Education', '/education/edit': 'Education',
        '/experience': 'Experience', '/experience/edit': 'Experience',
        '/certifications': 'Certifications',
        '/skills': 'Skills',
        '/project': 'Project'
      };
      return routeToTabName[route.path] || 'Contact Info'; // Default to Contact Info
    });

    return {
      isHomePage,
      currentTab
    };
  },
};
</script>

<style>
#app {
  font-family: 'Helvetica', sans-serif;
  flex-direction: column;
  height: min-content;
  background-color: #021E2C;
  overflow: hidden;
}
</style>
