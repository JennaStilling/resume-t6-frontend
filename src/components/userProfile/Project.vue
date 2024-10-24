<template>
  <div class="container">
    <div class="sidebar">
      <div class="list">
        <!-- PROJECT LIST ON LEFT SIDE -->
        <div class="list-title" @click="toggleDropdown">Project List ▼</div>
        <br>
        <div v-if="showDropdown" class="dropdown">
          <ul>
            <li v-for="(item, index) in projectItems" :key="index" class="dropdown-item">
              <!-- Display each project's name -->
              <span class="project-name name">{{ item.name }}</span>
              <div class="buttons">
                <!-- Edit button for entry -->
                <div class="edit-button" @click.stop="editEntry(index)">
                  <div class="edit-button-child"></div>
                  <b class="edit">EDIT</b>
                </div>
                <!-- Delete button for entry -->
                <button class="delete-button" @click.stop="deleteEntry(index)">DELETE</button>
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
          <b class="save-changes">SAVE CHANGES</b>
        </div>
      </div>

      <!-- Navigation buttons -->
      <div class="navigation-buttons">
        <button class="nav-button" @click="goBack">BACK</button>
        <button class="nav-button" @click="goNext">BUILD</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDropdown: false, 
      // UPDATE WITH BACKEND DATA LATER
      formData: {
        name: '', 
        description: '', 
      },
      projectItems: [ 
        { name: 'Course Listing App' },
        { name: 'Calculator' }
      ],
    };
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    editEntry(index) {
      // Edit logic for specific entry
    },
    deleteEntry(index) {
      // Delete logic for specific entry
    },
    saveChanges() {
      // Save logic for specific entry
    },
    // Navigate to pages:
    // Goes back to the previous section (Skills)
    goBack() {
      this.$router.push('/skills');
    },
    // FIX LATER: Goes to the home page
    goNext() {
      this.$router.push('/build-resume');
    }
  },
};
</script>

<style>
@import '@/assets/dark-mode.css';
</style>
