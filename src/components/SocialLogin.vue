<template>
    <div class="signup-buttons">
      <v-row justify="center">
        <div id="parent_id" display="flex"></div>
      </v-row>
    </div>
  </template>
  
  <script>
  import AuthServices from "@/services/authServices";
  import Utils from "@/config/utils.js";
  
  export default {
    name: "LoginSignupSocial",
    data() {
      return {
        fName: "",
        lName: "",
        id: "",
        roleCounter: 0,
        user: {},
      };
    },
    created() {},
    mounted() {
      this.loginWithGoogle();
    },
    methods: {
      async loginWithGoogle() {
        window.handleCredentialResponse = this.handleCredentialResponse;
        const client = import.meta.env.VITE_APP_CLIENT_ID;
        window.google.accounts.id.initialize({
          client_id: client,
          cancel_on_tap_outside: false,
          auto_select: true,
          callback: window.handleCredentialResponse,
        });
        window.google.accounts.id.renderButton(
          document.getElementById("parent_id"),
          {
            type: "standard",
            theme: "outline",
            size: "large",
            text: "signup_with",
            width: 400,
          }
        );
      },
      handleCredentialResponse(response) {
        let token = {
          credential: response.credential,
        };
        AuthServices.loginUser(token)
          .then((response) => {
            this.user = response.data;
            Utils.setStore("user", this.user);
            this.fName = this.user.fName;
            this.lName = this.user.lName;
            this.id = this.user.id;
            this.$router.push({ name: "home" });
          })
          .catch((error) => {
            console.log("error", error);
          });
      },
    },
  };
  </script>