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
            <li v-for="(item, index) in experiencesItems" :key="index" class="dropdown-item">
              <!-- Display each experience's name -->
              <span class="experience-name name">{{ item.name }}</span>
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

    <!-- Main form for entering experience details -->
    <div class="main-content">
      <div class="form">
        <!-- Experience role input field -->
        <div class="text-field-with-title">
          <label for="experienceName" class="field-label">ROLE</label>
          <input
            type="text"
            id="experienceName"
            v-model="formData.role"
            class="text-field"
            placeholder="Enter role"
            required
          />
          <span class="mandatory">*</span>
        </div>

        <!-- Experience company input field -->
        <div class="text-field-with-title">
          <label for="experienceCompany" class="field-label">COMPANY</label>
          <input
            type="text"
            id="experienceCompany"
            v-model="formData.company"
            class="text-field"
            placeholder="Enter company"
            required
          />
          <span class="mandatory">*</span>
        </div>

        <!-- Graduation date input field -->
        <div class="text-field-with-title">
          <label for="start_date" class="field-label">START DATE</label>
          <input
            type="date"
            id="start_date"
            v-model="formData.start_date"
            class="text-field"
            required
          />
          <span class="mandatory">*</span>
        </div>

        <!-- Graduation date input field -->
        <div class="text-field-with-title">
          <label for="end_date" class="field-label">END DATE</label>
          <input
            type="date"
            id="end_date"
            v-model="formData.end_date"
            class="text-field"
            required
          />
          <span class="mandatory">*</span>
        </div>

        <!-- Experience description input field -->
        <div class="text-field-with-title">
          <label for="job_description" class="field-label">JOB DESCRIPTION</label>
          <textarea
            id="job_description"
            v-model="formData.job_description"
            class="text-field"
            rows="4"
            placeholder="Enter a detailed description of your experience"
          ></textarea>
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
            {{ experiencesItems[currentExperienceIndex].name }}?
          </p>
          <p v-if="deleteError">
            Error deleting<br />
            {{ experiencesItems[currentExperienceIndex].name }}.
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

<script>
import experienceServices from "../../services/experienceServices.js";
import Utils from "../../config/utils.js";
export default {
  data() {
    return {
      showDropdown: true,
      formData: {
        role: '',
        company: '',
        start_date: '',
        end_date: '',
        job_description: '',
      },
      experiencesItems: [
        { name: 'JavaScript' },
        { name: 'Vue' }
      ],
      displayDelete: false,
      deleteError: false,
      currentExperienceIndex: null,
    };
  },
  computed: {
    buttonLabel() {
      return this.$route.path.includes('/experience/edit/') ? 'SAVE CHANGES' : 'ADD EXPERIENCE';
    },
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    editEntry(index) {
      this.$router.push({ path: `/experience/edit/` });
    },
    showDeleteConfirmation(index) {
      this.currentExperienceIndex = index;
      this.displayDelete = true;
    },
    deleteExperience() {
      try {
        this.experiencesItems.splice(this.currentExperienceIndex, 1);
        this.currentExperienceIndex = null;
        this.displayDelete = false;
      } catch (error) {
        this.deleteError = true;
      }
    },
    saveChanges() {
      if(this.$route.path.includes('/experience/edit/'))
      {
          //save
      }
      else {
        console.log(this.formData);
        experienceServices.createExperience(Utils.getUser.value.studentId, this.formData)
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
      this.$router.push('/education');
    },
    goNext() {
      this.$router.push('/certifications');
    }
  },
};
</script>

<style>
@import '@/assets/dark-mode.css';
</style>