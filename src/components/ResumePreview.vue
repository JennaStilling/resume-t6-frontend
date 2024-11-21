<template>
  <div class="resume-preview" 
    @click="handleClick"
    @mouseover="handleMouseover"
    @mouseleave="handleMouseleave"
    >
    <div class="resume-icon">
      <img src="/src/assets/simple-resume-template.png" alt="Resume Image" width="100" max-width="150" />
    </div>
    <h3>{{ resume.name }}</h3>
    <p>{{ resume.description }}</p>

    <!-- Hover overlay -->
    <div class="hover-overlay" v-if="showActions">
      <v-btn icon color="primary" @click="handleEdit">Edit</v-btn>
      <v-btn icon color="error" @click="handleDelete">Delete</v-btn>
    </div>
  </div>
</template>

  
<script setup>
  import { ref, onMounted } from "vue";
  import Utils from '@/config/utils.js';
  import ResumeServices from "@/services/resumeServices";
  
  const props = defineProps({
    resume: Object,
  });
  
  onMounted(() => {
    Utils.getUser(user).then(value => {
      studentId.value = value.studentId;
      getResumes();
    });
  });

  const emit = defineEmits(['edit', 'delete']);
  const user = Utils.getStore("user");
  const studentId = ref();
  const showActions = ref(false);
  const resumes = ref([]);

  onMounted(() => {
    Utils.getUser(user).then(value => {
      studentId.value = value.studentId;
      getResumes();
    });
  });

  const getResumes = () => {
    ResumeServices.getAllResumes(studentId.value)
        .then((response) => {
          resumes.value = response.data;
        })
        .catch((error) => {
          console.log("Could not retrieve resumes: " + error);
        })
  };

  const handleMouseover = () => {
    showActions.value = true;
  };

  const handleMouseleave = () => {
    showActions.value = false;
  };

  const handleClick = () => {
    console.log(`Clicked on resume ${props.resume.name}`);
  };
  
  const handleEdit = () => {
    emit('edit', props.resume.id);
  };
  
  const handleDelete = async () => {
    try {
      await ResumeServices.deleteResume(studentId.value, props.resume.id);
      emit('delete', props.resume.id);
    } catch (error) {
      console.error('Error deleting resume:', error);
    }
  };
  </script>
  
  <style scoped>
  .resume-preview {
    width: 222px; /* Set width to resemble a piece of paper */
    height: 298px; /* Set height */
    border: 2px dashed #1A9BCB; /* Dashed border */
    padding: 10px; /* Padding inside the box */
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow */
    margin-bottom: 20px; /* Space below the shortcut area */
    border-radius: 20px;
    cursor: pointer;
  }
  
  .resume-preview:hover {
    background-color: #118ACB;
  }

  .hover-overlay {
    position: relative;
    top: 20px;
    bottom: 10px;
    display: flex;
    justify-content: center;
    gap: 20%;
    z-index: 1000;
  }

  .hover-overlay button {
    font-size: 18px !important;
  }

  .resume-icon {
    display: flex;
    justify-content: center; /* Space between dropdown and buttons */
    gap: 30px;
    margin-bottom: 20px; /* Space below the shortcuts */
    margin-top: 10px;
  }
  </style>
  