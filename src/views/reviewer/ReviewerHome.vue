<script setup>
import Utils from "@/config/utils.js";
import UserServices from "../../services/userServices.js";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const user = ref(null);
const initials = ref("");
const router = useRouter();

const studentId = ref(""); 
const adminId = ref("");
const reviewerId = ref("");

onMounted(() => {
user.value = Utils.getStore("user");
console.log(user.value);

getUserRoles();
});



const getUserRoles = () => {
  UserServices.getUser(user.value.userId)
    .then((res) => {
      user.value = res.data;
      console.log("ID: " + user.value.id);
      console.log("Student ID: " + user.value.studentId);
      console.log("Admin ID: " + user.value.adminId);
      console.log("Reviewer ID: " + user.value.reviewerId);

      studentId.value = user.value.studentId;
      adminId.value = user.value.adminId;
      reviewerId.value = user.value.reviewerId;
    })
    .catch((error) => {
      console.log("error", error);
    });
};
</script>

<template>
    <div class="home-page">
        <h1>Welcome to ResuMate!</h1>
        <p>This is the reviewer home page</p>
    </div>
</template>

<style scoped>
@import "@/assets/dark-mode.css";

.home-page {
    color: white;
    padding: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
}
</style>