<template>
  <div class="main-content">
    <div class="form">
      <!-- First Name Field -->
      <div class="text-field-with-title">
        <label for="firstName" class="field-label">FIRST NAME</label>
        <input
          type="text"
          id="firstName"
          v-model="formData.fName"
          class="text-field"
          placeholder="Enter your first name"
          required
        />
        <span class="mandatory">*</span>
      </div>

      <!-- Last Name Field -->
      <div class="text-field-with-title">
        <label for="lastName" class="field-label">LAST NAME</label>
        <input
          type="text"
          id="lastName"
          v-model="formData.lName"
          class="text-field"
          placeholder="Enter your last name"
          required
        />
        <span class="mandatory">*</span>
      </div>

      <!-- Email Field -->
      <div class="text-field-with-title">
        <label for="email" class="field-label">EMAIL</label>
        <input
          type="email"
          id="email"
          v-model="formData.email"
          class="text-field"
          placeholder="Enter your email address"
        />
      </div>

      <!-- Save Changes Button -->
      <div class="save-button" @click="saveContactInfo">
        <div class="save-button-child"></div>
        <b class="save-changes">SAVE CHANGES</b>
      </div>
    </div>

    <!-- Navigation Buttons Section -->
    <div class="navigation-buttons">
      <button class="nav-button" @click="exit">EXIT</button>
      <button class="nav-button" @click="goNext">NEXT</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import Utils from "../../config/utils.js";
import userServices from "@/services/userServices.js";

const router = useRouter();
const route = useRoute();

const user = Utils.getStore("user");
const studentId = ref();

const errors = ref({});

onMounted(() => {
  Utils.getUser(user).then(value => {
    studentId.value = value.studentId;
  });
});

const formData = ref({
  fName: user.fName,
  lName: user.lName,
  email: user.email
});

function saveContactInfo() {
  userServices.updateStudentUser(studentId.value, user.userId, formData.value)
    .then(() => {
      user.fName = formData.value.fName;
      user.lName = formData.value.lName;
      user.email = formData.value.email;
      Utils.setStore("user", user);
      window.location.reload();
    })
    .catch((error) => {
      if (error.response != null && error.response.status == "406") {
        for(let obj in errors.value) {
          errors.value[obj] = '*'
        }
        for (let obj of error.response.data) {
          if (obj.attributeName === undefined) {
            obj.attributeName = "idNumber";
          }
          errors.value[obj.attributeName] = obj.message;
        }
      } else {
        console.log(error);
        console.log(error);
      }
    });
}

function exit() {
  router.push('/studentHome');
}

function goNext() {
  router.push('/experience');
}
</script>

<style>
@import '@/assets/dark-mode.css';
</style>

  