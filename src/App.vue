<!-- src/App.vue -->
<template>
  <div id="app">
    <nav>
      <ul>
        <div>
          <li>
            <a>{{ "Resume Listing" }}</a>
          </li>
        </div>
      </ul>
      <ul>
        <div>
          <li>
            <router-link :to="{name: 'login'}"><a>LOGIN</a></router-link>
          </li>
          <li>
            <router-link :to="{name: 'logout'}"><a>LOGOUT</a></router-link>
          </li>
          <li>
            <router-link :to="{name: 'resumes'}"><a>LIST</a></router-link>
          </li>
          <li>
            <router-link :to="{name: 'resume', params: { id: 1 }}"><a>VIEW RESUME</a></router-link>
          </li>
          <li>
            <router-link :to="{name: 'addResume'}"><a>ADD RESUME</a></router-link>
          </li>
          <li>
            <router-link :to="{name: 'editResume', params: { id: 1 }}"><a>EDIT RESUME</a></router-link>
          </li>
          <li>
            <router-link :to="{name: 'profile'}"><a>VIEW PROFILE</a></router-link>
          </li>
        </div>
      </ul>
    </nav>
    <router-view />
  </div>
</template>
<<<<<<< HEAD

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
=======
>>>>>>> dev
