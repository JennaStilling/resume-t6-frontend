<template>
    <div id="app">
      <nav>
        <ul class="menu">
          <li class="menu-item header">
            <p>Resume Listing</p>
          </li>
          <li class="menu-item">
            <router-link :to="{ name: 'login' }">LOGIN</router-link>
          </li>
          <li class="menu-item">
            <router-link :to="{ name: 'logout' }">LOGOUT</router-link>
          </li>
          <li class="menu-item">
            <router-link :to="{ name: 'resumes' }">LIST</router-link>
          </li>
          <li class="menu-item">
            <router-link :to="{ name: 'resume', params: { id: 1 } }">VIEW RESUME</router-link>
          </li>
          <li class="menu-item">
            <router-link :to="{ name: 'addResume' }">ADD RESUME</router-link>
          </li>
          <li class="menu-item">
            <router-link :to="{ name: 'editResume', params: { id: 1 } }">EDIT RESUME</router-link>
          </li>
          <li class="menu-item">
            <router-link :to="{ name: 'profile' }">VIEW PROFILE</router-link>
          </li>
        </ul>
      </nav>
      <router-view />
    </div>
  </template>
  
  <style scoped>
  .menu {
    list-style-type: none;
    padding: 0;
  }
  
  .menu-item {
    margin: 10px 0;
  }
  
  .header {
    color: white;
    font-weight: bold;
    font-size: 1.2em;
  }
  </style>  