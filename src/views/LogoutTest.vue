<script setup>

import { ref, onMounted } from "vue";
import Utils from "../config/utils";
import AuthServices from "../services/authServices";
import { useRouter } from "vue-router";

const user = ref(null);
const initials = ref("");
const name = ref("");
const router = useRouter();


user.value = Utils.getStore("user");
if (user.value) {
    initials.value = user.value.fName[0] + user.value.lName[0];
    name.value = user.value.fName + " " + user.value.lName;
  }
  console.log(user.value)


const logout = () => {
  AuthServices.logoutUser(user.value)
    .then((response) => {
      console.log(response);
      Utils.removeItem("user");
      router.push({ name: "login" });
    })
    .catch((error) => {
      console.log("error", error);
    });
};
</script>


<template>
  <br>
  <p style="color:white;"> - Logged IN</p>
  <v-btn depressed rounded text @click="logout"> Logout </v-btn>
</template>