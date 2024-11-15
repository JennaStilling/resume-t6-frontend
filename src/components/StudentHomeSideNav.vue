<template>
    <div class="container">
      <nav class="sidebar">
        <ul>
          <li>
            <button class="resume-button" @click="selectItem(navItems[0])">
              {{ navItems[0].name }}
            </button>
          </li>
          <li v-for="item in navItems.slice(1)" :key="item.name" @click="selectItem(item)" :class="{ 'cursor-pointer': isActive }">
            {{ item.name }}
          </li>
        </ul>
      </nav>
    </div>
</template>
  
<script setup>
  import { ref } from "vue";
  import { useRouter } from 'vue-router';
  // import Utils from '@/config/utils.js';

  const router = useRouter();
  const isActive = ref(true);

  const navItems = [
    { name: 'Start a New Resume' },
    { name: 'My Home' },
    { name: 'Request Resume Review' },
    { name: 'Resume Templates' }
  ]

  const selectItem = (item) => {
    if (item.name === "Start a New Resume") {
      router.push({ name: 'addResume' });
    } else if (item.name === 'My Home') {
      router.push('/');
      // This needs to be changed for taking into account Student Roles and going to StudentHome
    } else if (item.name === 'Request Resume Review') {
      router.push({ name: 'reviewResume' });
    } else if (item.name === 'Resume Templates') {
      router.push({ name: 'resumeTemplates' });
    }
  }
</script>
  
<style scoped>
  .container {
    display: flex;
  }
  
  .sidebar {
    width: 200px;
    background-color: #2c3e50; /* Dark background color */
    color: white; /* Text color */
    height: 100vh; /* Full height */
    padding: 20px;
  }
  
  .sidebar ul {
    list-style-type: none; /* Remove bullet points */
    padding: 0; /* Remove default padding */
  }
  
  .sidebar li {
    margin: 15px 0; /* Space between items */
  }
  
  .resume-button {
    width: 100%; /* Full width button */
    padding: 10px; /* Padding for the button */
    background-color: #118ACD; /* Blue background */
    color: white; /* Text color */
    border: none; /* Remove border */
    cursor: pointer; /* Pointer cursor for clickable items */
    border-radius: 5px; /* Slightly rounded corners */
  }
  
  .resume-button:hover {
    background-color: #1eade0; /* Darker blue on hover */
  }
  
  .sidebar li:hover {
    background-color: #3d5166; /* Lighten on hover for other items */
  }
  
  .content {
    padding: 20px; /* Padding for the content area */
    flex-grow: 1; /* Take up remaining space */
  }

  .cursor-pointer {
  cursor: pointer;
  }
</style>