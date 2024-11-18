<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <span @click="closeModal" class="close">&times;</span>
      <div class="modal-header">
        <p>Update Profile Information?</p>
        <hr />
      </div>
      <img src="@/assets/bigUserIcon.png" alt="User Icon" class="user-icon" />
      <div class="modal-body">
        <button class="modal-button skip-button" @click="skip">SKIP</button>
        <button class="modal-button yes-button" @click="confirm">YES</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UpdateProfileModal',
  methods: {
    closeModal() {
      this.$emit('close');
    },
    skip() {
      this.$router.push("/add");
    },
    confirm() {
      this.$router.push("/contact-info");
    }
  }
};
</script>

<style scoped>
@import '@/assets/dark-mode.css';

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(3px);
  z-index: 1000;
}

.modal-content {
  background-color: #0a4a6c;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  color: #ffffff;
  width: 600px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  position: relative;
}

.close {
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: 28px;
  cursor: pointer;
  color: rgb(255, 255, 255);
}

.modal-header p {
  font-size: 22px;
  font-weight: bold;
  color: white;
  margin-bottom: 10px;
}

.modal-header hr {
  margin: 10px 0;
  border: none;
  border-top: 4px solid #ffffff;
}

.user-icon {
  width: 130px;
  height: 125px;
  margin: 15px auto; 
}

.modal-body {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 10px;
}

.modal-button {
  padding: 12px 25px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #118ACB;
  color: white;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25);
  transition: background-color 0.3s ease, transform 0.2s ease;
  font-size: 17px;
}

.skip-button {
  background-color: #d9534f;
}

.yes-button {
  background-color: #0275d8;
}

.skip-button:hover {
  background-color: #c9302c;
  transform: translateY(-2px);
}

.yes-button:hover {
  background-color: #28a745;
  transform: translateY(-2px);
}

button:focus {
  outline: none;
}
</style>
