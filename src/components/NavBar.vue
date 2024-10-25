/* src/components/NavBar.vue */
<template>
  <nav class="navbar">
    <button 
      v-for="tab in tabs"
      :key="tab"
      :class="{ active: currentTab === tab }"
      @click="changeTab(tab)"
    >
      {{ tab }}
    </button>
  </nav>
</template>

<script>
export default {
  props: ['currentTab'],
  data() {
    return {
      tabs: ['Contact Info', 'Education', 'Experience', 'Certifications', 'Skills', 'Project'],
    }
  },
  methods: {
    changeTab(tab) {
      const routes = {
        'Contact Info': '/contact-info',
        'Education': '/education',
        'Experience': '/experience',
        'Certifications': '/certifications',
        'Skills': '/skills',
        'Project': '/project',
      };
      this.$emit('update:currentTab', tab);
      this.$router.push(routes[tab]);
    }
  }
}
</script>

<style scoped>
.navbar {
  background-color: #021E2C;
  display: flex;
  justify-content: space-around;
  padding: 10px;
  width: 100%;
  position: relative;
}

button {
  background: none;
  border: none;
  color: #FFF;
  font-size: 16px;
  cursor: pointer;
  position: relative;
  padding: 10px 20px;
  border-radius: 4px;
}

button.active {
  background-color: #118ACB;
  color: #FFF;
}

button:hover {
  background-color:#084565;
}

.navbar::after {
  content: '';
  display: block;
  width: 100%;
  height: 2px;
  background-color: #FFF; 
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>
