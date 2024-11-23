<template>
    <div id="app">
      <nav>
        <ul class="menu">
          <li class="menu-item header">
            <p>Resume Listing</p>
          </li>
          <li class="menu-item">
            <router-link :to="{ name: 'studentHome' }">STUDENT HOME</router-link>
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
    padding: 2;
  }
  
  .menu-item {
    margin: 10px 2%;
    font-size: 50px;
  }
  
  .menu-item a {
    color: white;
    text-decoration: none;
  }
  
  .menu-item a:hover {
    text-decoration: underline;
  }
  
  .menu-item .router-link-active {
    font-weight: bold;
    text-decoration: underline;
  }
  
  .header {
    color: white;
    font-weight: bold;
    font-size: 1.2em;
  }
  </style>