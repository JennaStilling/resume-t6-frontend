<template>
  <div v-if="loading">
    <label class="field-label">Loading...</label>
  </div>
  <div v-else>
    <div class="resume">
      <div class="text-field-with-title">
        <label for="degree" class="field-label">Resume</label>
        <input type="text" id="degree" v-model="resume" class="text-field" placeholder="Enter your degree" required />
        <span class="mandatory">*</span>
      </div>
    </div>

    <div class="result">
      <div class="text-field-with-title">
        <label for="degree" class="field-label">Result</label>
        <input type="text" id="degree" v-model="result" class="text-field" placeholder="Enter your degree" required />
        <span class="mandatory">*</span>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue';

const cohereClient = inject('cohereClient');

const data = ref(null);

const result = ref(null);
const loading = ref(true);
const error = ref(null);
const resume = "John Smith\n123 Main Street\nSpringfield, IL 62701\n(555) 123-4567\njohn.smith@email.com\nLinkedIn Profile | GitHub\n\nEducation\nBachelor of Science in Computer Science\nUniversity of Illinois, Urbana-Champaign\nExpected Graduation: May 2025\nGPA: 3.7\n\nTechnical Skills\nProgramming Languages: Python, Java, C++, JavaScript\nWeb Development: HTML, CSS, JavaScript, React, Node.js\nDatabase Management: MySQL, MongoDB\nTools & Technologies: Git, GitHub, Visual Studio Code, AWS (Basic knowledge)\nProjects\nPersonal Portfolio Website\n\nCreated a responsive portfolio website using HTML, CSS, and JavaScript to showcase personal projects and experience.\nIntegrated animations and a contact form, achieving over 500 visits in the first month.\nReal-Time Chat Application\n\nDeveloped a chat application using Node.js, Express, and Socket.IO for real-time messaging.\nImplemented user authentication with JWT and Firebase, enhancing security and user experience.\nStudent Database Management System\n\nDesigned a MySQL database to manage student records and implemented a front-end using Python and Tkinter.\nEnabled efficient data entry and retrieval, resulting in a 50% time reduction for administrative tasks.\nExperience\nSoftware Development Intern\nXYZ Tech Solutions, Chicago, IL\nJune 2024 – August 2024\n\nContributed to the development of a customer-facing web application, working on both front-end and back-end features.\nOptimized website loading times, reducing load times by 25%.\nIntegrated third-party APIs to expand application functionality, enhancing user engagement.\nExtracurricular Activities\nPresident, Computer Science Club\nUniversity of Illinois, Urbana-Champaign\nSeptember 2023 – Present\n\nOrganized coding workshops and hackathons, attracting over 100 students to club events.\nEstablished partnerships with local tech companies, providing mentorship and internship opportunities for club members.\nCertifications\nAWS Certified Cloud Practitioner\nGoogle Analytics for Beginners\nVolunteer Experience\nTech Mentor, Code for Good\nJune 2023 – Present\n\nProvided coding support and mentorship to high school students interested in programming.\nAssisted in organizing monthly coding challenges, creating a hands-on learning environment.\n";;

onMounted(async () => {
  try {
    console.log('Start');
    const response = await cohereClient.chat({
      message: resume,
      model: "command-r-08-2024",
      preamble: "You are an AI-assistant chatbot. You are trained to assist users by analyzing their resume. You will provide a concise list of recommendations to improve their resumes."
    });
    console.log('Done');
    console.log(response.text);
    result.value = response.text;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
    console.log('finally :?');
  }
});
</script>

<style>
@import '@/assets/dark-mode.css';
</style>