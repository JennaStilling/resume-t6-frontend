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
            <li v-for="(item, index) in projectItems" :key="index" class="dropdown-item">
              <!-- Display each project's name -->
              <span class="project-name name">{{ item.name }}</span>
              <div class="icon-buttons">
                <!-- Edit icon for entry -->
                <img src="@/assets/list-elements/edit-list-item.png" alt="Edit" class="icon"
                  @click.stop="editEntry(index)" />
                <!-- Delete icon for entry -->
                <img src="@/assets/list-elements/delete-list-item.png" alt="Delete" class="icon"
                  @click.stop="showDeleteConfirmation(index)" />
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
          <input type="text" id="projectName" v-model="formData.name" class="text-field"
            placeholder="Enter project name" required />
          <span class="mandatory">*</span>
        </div>

        <!-- Project description input field -->
        <div class="text-field-with-title">
          <label for="projectDescription" class="field-label">DESCRIPTION</label>
          <textarea id="projectDescription" v-model="formData.description" class="text-field" rows="4"
            placeholder="Enter a detailed description of the project"></textarea>
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
          <button v-if="!deleteError" class="error modal-button" @click="deleteCourse()">
            DELETE
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import projectServices from "../../services/projectServices.js";
import Utils from "../../config/utils.js";
export default {
  data() {
    return {
      showDropdown: true,
      formData: {
        name: '',
        description: '',
      },
      projectItems: [
        { name: 'Course Listing App' },
        { name: 'Calculator' }
      ],
      displayDelete: false,
      deleteError: false,
      currentProjectIndex: null,
    };
  },
  computed: {
    buttonLabel() {
      return this.$route.path.includes('/project/edit/') ? 'SAVE CHANGES' : 'ADD PROJECT';
    },
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    editEntry(index) {
      const projectName = this.projectItems[index].name;
      this.$router.push({ path: `/project/edit/` });
    },
    showDeleteConfirmation(index) {
      this.currentProjectIndex = index;
      this.displayDelete = true;
    },
    deleteCourse() {
      try {
        this.projectItems.splice(this.currentProjectIndex, 1);
        this.currentProjectIndex = null;
        this.displayDelete = false;
      } catch (error) {
        this.deleteError = true;
      }
    },
    saveChanges() {
      if (this.$route.path.includes('/project/edit/')) {
        //save
      }
      else {
        console.log(this.formData);
        projectServices.createProject(Utils.getUser.value.studentId, this.formData)
          .then(() => {
            window.location.reload();
          })
          .catch((error) => {
            if (error.response != null && error.response.status == "406") {
              // for (let obj in errors.value) {
              //   errors.value[obj] = '*'
              // }
              // for (let obj of error.response.data) {
              //   if (obj.attributeName === undefined) {
              //     obj.attributeName = "idNumber";
              //   }
              //   errors.value[obj.attributeName] = obj.message;
              // }
            // } else {
              message.value = "Error: " + error.code + ":" + error.message;
              console.log(error);
            }
            else
            {
              console.log(error);
              //console.log(token);
            }
          });
      }
    },
    goBack() {
      this.$router.push('/skills');
    },
    goNext() {
      this.$router.push('/');
    }
  },
};
</script>

<style>
@import '@/assets/dark-mode.css';
</style>