<template>
    <div class="resume-container">
      <div class="header">
        <button class="back-button">&#x2190;</button>
        <h1 style="color:black;">Auror-Resume-v1</h1>
      </div>
      <div class="content">
        <div class="resume-pdf">
          <img src="https://placeholder.pics/svg/400x500" alt="Resume PDF" />
        </div>
        <div class="email-section">
          <div class="email-box">
            <p><strong>Harry Potter &lt;h.potter@eagles.oc.edu&gt;</strong></p>
            <p>I’m applying to the Ministry of Magic to become an Auror. Does my resume align with that position?</p>
          </div>
          <div class="comments-section">
            <label for="comments">Comments:</label>
            <textarea id="comments" placeholder="Feedback..."></textarea>
          </div>
          <div class="options">
            <input type="checkbox" id="inPersonMeeting" />
            <label for="inPersonMeeting">Request in-person meeting</label>
          </div>
          <button class="send-button">SEND</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  </script>
  
  <style scoped>
  .resume-container {
    margin-top: 10px;
    background-color: #cfe0e8;
    padding: 20px;
    border-radius: 35px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .header {
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
  }
  
  .back-button {
    background: linear-gradient(90deg, #7B1329 0%, #E1234B 100%);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    color: white;
    border: none;
    border-radius: 15px;
    width: 40px;
    height: 40px;
    font-size: 20px;
    margin-right: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .content {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  
  .resume-pdf {
    flex: 1;
    margin-left: 50px;
  }
  
  .email-section {
    flex: 1;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .email-box {
    margin-bottom: 20px;
    padding: 10px;
    background-color: #f0f0f0;
    border-radius: 5px;
  }
  
  .comments-section {
    margin-bottom: 20px;
  }
  
  textarea {
    width: 100%;
    height: 100px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  .options {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .send-button {
    background-color: #007bff;
    color: #021E2C;
    font-weight: 800;
    border: none;
    padding: 7px 10px;
    border-radius: 5px;
    background: linear-gradient(90deg, #118ACB 0%, #69CBFF 100%);
    border: 4px #084565 solid;
    cursor: pointer;
  }
  
  .inPersonMeeting {
    margin-right: 10px;
    padding: 10px;
  }
  </style>  