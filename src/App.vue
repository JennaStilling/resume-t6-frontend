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
