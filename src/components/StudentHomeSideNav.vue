<template>
    <div class="container">
      <nav class="sidebar">
        <ul>
          <li>
            <button class="resume-button" @click="selectItem(navItems[0])">
              {{ navItems[0].name }}
            </button>
          </li>
          <li v-for="item in navItems.slice(1)" :key="item.id" @click="selectItem(item)">
            {{ item.name }}
          </li>
        </ul>
      </nav>
      <div class="content">
        <h2>Selected Item: {{ selectedItem?.name }}</h2>
      </div>
    </div>
</template>
  
<script>
  export default {
    data() {
      return {
        navItems: [
          { id: 1, name: 'Start a New Resume' },
          { id: 2, name: 'My Dashboard' },
          { id: 3, name: 'Request Resume Review' },
          { id: 4, name: 'Resume Templates' },
        ],
        selectedItem: null,
      };
    },
    methods: {
      selectItem(item) {
        this.selectedItem = item;
      },
    },
  };
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
</style>