<template>
  <div class="container">
    <div class="sidebar">
      <div class="list">
        <!-- EXPERIENCE LIST ON LEFT SIDE -->
        <div class="list-title" @click="toggleDropdown">
          Experience List {{ showDropdown ? '▲' : '▼' }}
        </div>
        <br />
        <div v-if="showDropdown" class="dropdown">
          <ul>
            <li v-for="(item, index) in experiences" :key="index" class="dropdown-item">
              <!-- Display each experience's name -->
              <span class="experience-name name">{{ item.role }}</span>
              <div class="icon-buttons">
                <!-- Edit icon for entry -->
                <img
                  src="@/assets/list-elements/edit-list-item.png"
                  alt="Edit"
                  class="icon"
                  @click.stop="editEntry(item)"
                />
                <!-- Delete icon for entry -->
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
      </div>
    </div>

    <!-- Main form for entering experience details -->
    <div class="main-content">
      <div class="form">
        <!-- Experience role input field -->
        <div class="text-field-with-title">
          <label for="experienceName" class="field-label">ROLE</label>
          <input type="text" id="experienceName" v-model="formData.role" class="text-field" placeholder="Enter role"
            required />
          <span class="mandatory">*</span>
        </div>

        <!-- Experience company input field -->
        <div class="text-field-with-title">
          <label for="experienceCompany" class="field-label">COMPANY</label>
          <input type="text" id="experienceCompany" v-model="formData.company" class="text-field"
            placeholder="Enter company" required />
          <span class="mandatory">*</span>
        </div>

        <!-- Start date input field -->
        <div class="text-field-with-title">
          <label for="start_date" class="field-label">START DATE</label>
          <input type="date" id="start_date" v-model="formData.start_date" class="text-field" required />
          <span class="mandatory">*</span>
        </div>

        <!-- End date input field -->
        <div class="text-field-with-title">
          <label for="end_date" class="field-label">END DATE</label>
          <input type="date" id="end_date" v-model="formData.end_date" class="text-field" required />
          <span class="mandatory">*</span>
        </div>

        <!-- Experience description input field -->
        <div class="text-field-with-title">
          <label for="job_description" class="field-label">JOB DESCRIPTION</label>
          <textarea id="job_description" v-model="formData.job_description" class="text-field" rows="4"
            placeholder="Enter a detailed description of your experience"></textarea>
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
            {{ experienceToDelete.name }}?
          </p>
          <p v-if="deleteError">
            Error deleting<br />
            {{ experienceToDelete.name }}.
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
            @click="deleteExperience()"
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
import experienceServices from "../../services/experienceServices.js";
import Utils from "../../config/utils.js";

const router = useRouter();
const route = useRoute();

const user = Utils.getStore("user");
const studentId = ref();
const experiences = ref(null);

const errors = ref({});

onMounted(() => {
  Utils.getUser(user).then(value => {
    studentId.value = value.studentId;
    getExperience();
  });
});

const showDropdown = ref(true);
const formData = ref({
  role: '',
  company: '',
  start_date: '',
  end_date: '',
  job_description: ''
})

const currentExperience = ref(null);
const displayDelete = ref(false);
const deleteError = ref(false);
const experienceToDelete = ref(null);
const message = ref('');

const buttonLabel = computed(() => {
  return route.path.includes('/experience/edit/') ? 'SAVE CHANGES' : 'ADD EXPERIENCE';
});


function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
}

function editEntry(item) {
  router.push({ path: `/experience/edit/` });
  currentExperience.value = item.id;
  formData.value.role = item.role;
  formData.value.company = item.company;
  formData.value.start_date = item.start_date;
  formData.value.end_date = item.end_date;
  formData.value.job_description = item.job_description;
}

function showDeleteConfirmation(item) {
  experienceToDelete.value = item;
  displayDelete.value = true;
}

function deleteExperience() {
  experienceServices.deleteExperience(studentId.value, experienceToDelete.value.id)
    .then(() => {
      displayDelete.value = false;
      deleteError.value = false;
      getExperience();
    })
    .catch((error) => {
      console.log(error);
      deleteError.value = true;
    });
}

function saveChanges() {
  if (route.path.includes('/experience/edit/')) {
    experienceServices.updateExperience(studentId.value, currentExperience.value, formData.value)
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
      router.push('/experience');
  } else {
    experienceServices.createExperience(studentId.value, formData.value)
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
  router.push('/education');
}

function goNext() {
  router.push('/certifications');
}

const getExperience = () => {
      experienceServices.getAllExperiences(studentId.value)
        .then((res) => {
            experiences.value = res.data;
        })
        .catch((err) => {
            console.log(err);
        });
    }
</script>

<style>
@import '@/assets/dark-mode.css';
</style>