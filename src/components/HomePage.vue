<template>
  <div class="home-page">
    <h1>Welcome to ResuMate!</h1>
    <p> (Fix Home Page later) </p>

    <div class="start-button" @click="login">Login Page Idea</div>
    <div class="start-button" @click="list">Testing Login Features</div>
    <div class="start-button" @click="showModal = true">START A NEW RESUME</div>

    <UpdateProfileModal v-if="showModal" @close="showModal = false" />
  </div>
</template>

<script>
import UpdateProfileModal from '@/components/UpdateProfileModal.vue';

export default {
  name: 'HomePage',
  components: {
    UpdateProfileModal
  },
  data() {
    return {
      showModal: false
    };
  },
  methods: {
    start() {
      this.showModal = true;
    },
    login() {
      this.$router.push('/login');
    },
    list() {
      this.$router.push('/profile-app');
    }
  }
};
</script>

<style scoped>
@import '@/assets/dark-mode.css';

.home-page {
  color: white;
  padding: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}

.start-button {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  border-radius: 7px;
  background-color: #118acb;
  width: 320px;
  height: 73px;
  color: #fff;
  font-size: 24px;
  text-shadow: 0px 4px 6px rgba(0, 0, 0, 0.35);
  cursor: pointer;
}
</style>