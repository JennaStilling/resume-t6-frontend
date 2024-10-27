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
        <!-- Experience name input field -->
        <div class="text-field-with-title">
          <label for="experienceName" class="field-label">NAME</label>
          <input
            type="text"
            id="experienceName"
            v-model="formData.name"
            class="text-field"
            placeholder="Enter experience name"
            required
          />
          <span class="mandatory">*</span>
        </div>

        <!-- Experience description input field -->
        <div class="text-field-with-title">
          <label for="description" class="field-label">DESCRIPTION</label>
          <textarea
            id="description"
            v-model="formData.description"
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
export default {
  data() {
    return {
      showDropdown: true,
      formData: {
        name: '',
        description: '',
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
      // Save changes logic
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