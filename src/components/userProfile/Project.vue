<template>
  <div class="container">
    <div class="sidebar">
      <div class="list">
        <!-- PROJECT LIST ON LEFT SIDE -->
        <div class="list-title" @click="toggleDropdown">
          Project List {{ showDropdown ? '▲' : '▼' }}
        </div>
        <br>
        <div v-if="showDropdown" class="dropdown">
          <ul>
            <li v-for="(item, index) in projects" :key="index" class="dropdown-item">
              <!-- Display each project's name -->
              <span class="project-name name">{{ item.name }}</span>
              <div class="icon-buttons">
                <!-- Edit icon for entry -->
                <img
                  src="@/assets/list-elements/edit-list-item.png"
                  alt="Edit"
                  class="icon"
                  @click.stop="editEntry(index)"
                />
                <!-- Delete icon for entry -->
                <img
                  src="@/assets/list-elements/delete-list-item.png"
                  alt="Delete"
                  class="icon"
                  @click.stop="showDeleteConfirmation(index)"
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Main form for entering project details -->
    <div class="main-content">
      <div class="form">
        <!-- Project name input field -->
        <div class="text-field-with-title">
          <label for="projectName" class="field-label">PROJECT NAME</label>
          <input
            type="text"
            id="projectName"
            v-model="formData.name"
            class="text-field"
            placeholder="Enter project name"
            required
          />
          <span class="mandatory">*</span>
        </div>

        <!-- Project description input field -->
        <div class="text-field-with-title">
          <label for="projectDescription" class="field-label">DESCRIPTION</label>
          <textarea
            id="projectDescription"
            v-model="formData.description"
            class="text-field"
            rows="4"
            placeholder="Enter a detailed description of the project"
          ></textarea>
        </div>

        <!-- Save changes button -->
        <div class="save-button" @click="saveChanges">
          <div class="save-button-child"></div>
          <b class="save-changes">{{ buttonLabel }}</b>
        </div>
      </div>

      <!-- Navigation buttons -->
      <div class="navigation-buttons">
        <button class="nav-button" @click="goBack">BACK</button>
        <button class="nav-button" @click="goNext">NEXT?</button>
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
            {{ projectItems[currentProjectIndex].name }}?
          </p>
          <p v-if="deleteError">
            Error deleting<br />
            {{ projectItems[currentProjectIndex].name }}.
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
            @click="deleteProject()"
          >
            DELETE
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import projectServices from "../../services/projectServices.js";
import Utils from "../../config/utils.js";

const router = useRouter();
const route = useRoute();

const user = Utils.getStore("user");
const studentId = ref();
const projects = ref(null);

onMounted(() => {
  Utils.getUser(user).then(value => {
    studentId.value = value.studentId;
    getProject();
  });
});

const showDropdown = ref(true);
const formData = ref({
  name: '',
  description: '',
});
const displayDelete = ref(false);
const deleteError = ref(false);
const currentProjectIndex = ref(null);
const message = ref('');

const buttonLabel = computed(() => {
  return route.path.includes('/project/edit/') ? 'SAVE CHANGES' : 'ADD PROJECT';
});


function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
}

function editEntry(index) {
  router.push({ path: `/project/edit/` });
}

function showDeleteConfirmation(index) {
  currentProjectIndex.value = index;
  displayDelete.value = true;
}

function deleteProject() {
  try {
    projectItems.value.splice(currentProjectIndex.value, 1);
    currentProjectIndex.value = null;
    displayDelete.value = false;
  } catch (error) {
    deleteError.value = true;
  }
}

function saveChanges() {
  if (route.path.includes('/project/edit/')) {
    // Implement save functionality here
  } else {
    projectServices.createProject(studentId.value, formData.value)
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
  router.push('/skills');
}

function goNext() {
  router.push('/');
}

const getProject = () => {
      projectServices.getAllProjects(studentId.value)
        .then((res) => {
            projects.value = res.data;
            console.log(projects.value);
        })
        .catch((err) => {
            console.log(err);
        });
    }
</script>

<style>
@import '@/assets/dark-mode.css';
</style>