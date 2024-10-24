<template>
  <v-container>
    <v-toolbar>
      <v-toolbar-title>Welcome to Tutorials!</v-toolbar-title>
    </v-toolbar>
    <br /><br />
  <SocialLogin />
  <br /><br />
  </v-container>
</template>

<script>
import SocialLogin from "@/components/SocialLogin.vue";
export default {
  name: "Login",
  components: {
    SocialLogin,
  },
};
</script>