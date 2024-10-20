<template>
    <header class="header">
      <div class="logo-title">
        <img src="/src/assets/smallLogo.png" alt="ResuMate Logo" class="logo" />
        <div class="title">Your AI resume builder</div>
      </div>
      <img src="/src/assets/userIcon.png" alt="User" class="user-icon" />
    </header>
  </template>
  
  <style scoped>
  .header {
    background-color: #65001F;
    color: #FFF;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .logo-title {
    display: flex;
    align-items: center;
  }
  
  .user-icon {
    width: 50px;
    height: auto;
  }

  .logo {
    width: 80px;
    height: auto;
  }
  
  .title {
    margin-left: 10px; 
    font-size: 20px;
  }
  </style>  