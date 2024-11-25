<template>
  <div id="app">
    <Header v-if="currentTab.value !== 'login'" :currentTab="currentTab" />
    <NavBar v-if="showNavBar" :currentTab="currentTab" />
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

    // Define a mapping of specific base paths to tab names
    const routeToTabName = {
      '/contact-info': 'Contact Info',
      '/education': 'Education',
      '/courses': 'Courses',
      '/experience': 'Experience',
      '/certifications': 'Certifications',
      '/skills': 'Skills',
      '/project': 'Project'
    };
    
    // Check if the current route is the root home page
    const isHomePage = computed(() => route.path === '/');

    // Determine the current tab based on route path
    const currentTab = computed(() => {
      const basePath = Object.keys(routeToTabName).find(path => route.path.startsWith(path));
      return routeToTabName[basePath] || ''; 
    });

    // Determine if the NavBar should be shown
    const showNavBar = computed(() => {
      return currentTab.value !== '';
    });

    const showHeader = computed(() => {
      return currentTab.value === 'login'});

    return {
      isHomePage,
      currentTab,
      showNavBar
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