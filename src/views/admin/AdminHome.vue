<template>
    <sidebar-menu :menu="menu" />
  </template>
  
  <script>
    export default {
      data() {
        return {
          menu: [
            {
              header: 'Main Navigation',
              hiddenOnCollapse: true,
            },
            {
              href: '/',
              title: 'Dashboard',
              icon: 'fa fa-user',
            },
            {
              href: '/charts',
              title: 'Charts',
              icon: 'fa fa-chart-area',
              child: [
                {
                  href: '/charts/sublink',
                  title: 'Sub Link',
                },
              ],
            },
          ],
        }
      },
    }
  </script>

<!-- <script setup>

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
</style> -->