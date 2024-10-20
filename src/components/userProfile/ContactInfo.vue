<template>
    <div class="main-content-centered">
      <div class="form">
        <div class="text-field-with-title">
          <label for="firstName" class="field-label">FIRST NAME</label>
          <input
            type="text"
            id="firstName"
            v-model="formData.firstName"
            class="text-field"
            placeholder="Enter your first name"
            required
          />
          <span class="mandatory">*</span>
        </div>
        <div class="text-field-with-title">
          <label for="lastName" class="field-label">LAST NAME</label>
          <input
            type="text"
            id="lastName"
            v-model="formData.lastName"
            class="text-field"
            placeholder="Enter your last name"
            required
          />
          <span class="mandatory">*</span>
        </div>
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
        <div class="text-field-with-title">
          <label for="phone" class="field-label">PHONE NUMBER</label>
          <input
            type="tel"
            id="phone"
            v-model="formData.phone"
            class="text-field"
            placeholder="123-123-1234"
          />
        </div>
        <div class="save-button" @click="saveContactInfo">
          <div class="save-button-child"></div>
          <b class="save-changes">SAVE CHANGES</b>
        </div>
      </div>
      <div class="navigation-buttons">
        <button class="nav-button" @click="exit">EXIT</button>
        <button class="nav-button" @click="goNext">NEXT</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        formData: {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
        }
      };
    },
    methods: {
      saveContactInfo() {
        // Logic to save contact info
      },
      exit() {
        this.$router.push('/');
      },
      goNext() {
        this.$router.push('/education');
      }
    },
  };
  </script>
  
  <style>
  @import '@/assets/dark-mode.css';
  </style>
  
  