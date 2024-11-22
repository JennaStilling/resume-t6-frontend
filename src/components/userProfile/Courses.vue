<template>
    <div class="container">
      <div class="sidebar">
        <div class="list">
          <!-- EDUCATION LIST ON LEFT SIDE -->
          <div class="list-title" @click="toggleDropdown">
            Education List {{ showDropdown ? '▲' : '▼' }}
          </div>
          <br />
          <div v-if="showDropdown" class="dropdown">
            <ul>
              <li v-for="(item, index) in educations" :key="index" class="dropdown-item">
                <!-- Display each institution's name -->
                <span class="university-name name">{{ item.institution }}</span>
                <div class="icon-buttons">
                  <img
                    src="@/assets/list-elements/edit-list-item.png"
                    alt="Edit"
                    class="icon"
                    @click.stop="editEntry(item)"
                  />
                  <img
                    src="@/assets/list-elements/delete-list-item.png"
                    alt="Delete"
                    class="icon"
                    @click.stop="showDeleteConfirmation(item)"
                  />
                </div>
              </li>
            </ul>
          </div>
          <br/>
          <div class="list-title" @click="toggleDropdown">
            Courses List {{ showDropdown ? '▲' : '▼' }}
          </div>
        </div>
      </div>
  
      <!-- Main form for entering education details -->
      <div class="main-content">
        <div class="form">
          <!-- Education label -->
          <div class="text-field-with-title">
            <label class="field-label">EDUCATION</label>
              <div class="text-field-boring" readonly>{{formData.degree}}, {{ formData.institution }}</div>
          </div>

          <!-- Save/Add button -->
          <div class="save-button" @click="saveChanges">
            <div class="save-button-child"></div>
            <b class="save-changes">{{ buttonLabel }}</b>
          </div>
        </div>
  
        <!-- Navigation buttons -->
        <div class="navigation-buttons">
          <button class="nav-button" @click="goBack">BACK</button>
          <button class="nav-button" @click="goNext">NEXT</button>
        </div>
      </div>
  
      <!-- Hidden Delete Confirmation Pop-up -->
      <div v-if="displayDelete" class="modal">
        <div class="modal-content">
          <span @click="displayDelete = false" class="close">&times;</span>
          <div class="modal-header">
            <p style="font-weight: bold;">This action is permanent.</p>
            <hr />
            <p v-if="!deleteError">
              Are you sure you want to delete <br />
              {{ educationToDelete.institution }}?
            </p>
            <p v-if="deleteError">
              Error deleting<br />
              {{ educationToDelete.institution }}.
            </p>
          </div>
  
          <br />
          <div class="modal-body">
            <button v-if="!deleteError" @click="displayDelete = false" class="modal-button">
              CANCEL
            </button>
            <button
              v-if="!deleteError"
              class="error modal-button"
              @click="deleteEducation()"
            >
              DELETE
            </button>
            <button
              v-if="deleteError"
              @click="() => { deleteError = false; displayDelete = false; }"
              class="modal-button"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from "vue";
  import { useRouter, useRoute } from "vue-router";
  import educationServices from "../../services/educationServices.js";
  import Utils from "../../config/utils.js";
  
  const router = useRouter();
  const route = useRoute();
  
  const user = Utils.getStore("user");
  const studentId = ref();
  const educations = ref(null);
  
  const errors = ref({});
  
  onMounted(() => {
    Utils.getUser(user).then(value => {
      studentId.value = value.studentId;
      getEducation();
    });
  });
  
  const showDropdown = ref(true);
  const formData = ref({
    degree: '',
    institution: '',
    gpa: '',
    graduation_date: ''
  });
  
  const currentEducation = ref(null);
  const displayDelete = ref(false);
  const deleteError = ref(false);
  const educationToDelete = ref(null);
  const message = ref('');
  
  const buttonLabel = computed(() => {
    return route.path.includes('/courses/edit/') ? 'SAVE CHANGES' : 'ADD TO LIST';
  });
  
  
  function toggleDropdown() {
    showDropdown.value = !showDropdown.value;
  }
  
  function editEntry(item) {
    router.push({ path: `/courses/edit/` });
    currentEducation.value = item.id;
    formData.value.degree = item.degree;
    formData.value.institution = item.institution;
    formData.value.gpa = item.gpa;
    formData.value.graduation_date = item.graduation_date;
  }
  
  function showDeleteConfirmation(item) {
    educationToDelete.value = item;
    displayDelete.value = true;
  }
  
  function deleteEducation() {
    educationServices.deleteEducation(studentId.value, educationToDelete.value.id)
      .then(() => {
        displayDelete.value = false;
        deleteError.value = false;
        getEducation();
      })
      .catch((error) => {
        console.log(error);
        deleteError.value = true;
      });
  }
  
  function saveChanges() {
    if (route.path.includes('/courses/edit/')) {
      educationServices.updateEducation(studentId.value, currentEducation.value, formData.value)
        .then(() => {
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
        router.push('/education');
    } else {
      educationServices.createEducation(studentId.value, formData.value)
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          if (error.response && error.response.status === 406) {
            message.value = "Error: " + error.code + ":" + error.message;
            console.log(error);
          } else {
            console.log(error);
          }
        });
    }
  }
  
  // Navigation methods
  function goBack() {
    router.push('/contact-info');
  }
  
  function goNext() {
    router.push('/experience');
  }
  
  const getEducation = () => {
        educationServices.getAllEducations(studentId.value)
          .then((res) => {
              educations.value = res.data;
          })
          .catch((err) => {
              console.log(err);
          });
      }
  </script>
  
  <style>
  @import '@/assets/dark-mode.css';

  .text-field-boring {
    color: white;
    width: 100%;
    margin-top: 30px;
    padding: 5px;
    border: 1px solid white;
    border-radius: 4px;
    font-size: 16px; 
    font-family: 'Helvetica', sans-serif;
  }
  </style>