<script setup>

</script>

<template>
    <div>
        This is the admin home page
    </div>
    <ul class ="menu">
    <li class="menu-item">
        <router-link :to="{ name: 'viewStudentResume', params: { id: 1 } }">See Student Resume</router-link>
    </li>
</ul>
</template>

<style scoped>
.menu {
  list-style-type: none;
  padding: 0;
}

.menu-item {
  margin: 10px 0;
}
</style>