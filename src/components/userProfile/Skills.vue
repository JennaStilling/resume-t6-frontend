<template>
  <div class="container">
    <div class="sidebar">
      <div class="list">
        <!-- SKILLS LIST ON LEFT SIDE -->
        <div class="list-title" @click="toggleDropdown">Skills List ▼</div>
        <br>
        <div v-if="showDropdown" class="dropdown">
          <ul>
            <li v-for="(item, index) in skillsItems" :key="index" class="dropdown-item">
              <!-- Display each skill's name -->
              <span class="skill-name name">{{ item.name }}</span>
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

    <!-- Main form for entering skill details -->
    <div class="main-content">
      <div class="form">
        <!-- Skill name input field -->
        <div class="text-field-with-title">
          <label for="skillName" class="field-label">SKILL NAME</label>
          <input
            type="text"
            id="skillName"
            v-model="formData.name"
            class="text-field"
            placeholder="Enter skill name"
            required
          />
          <span class="mandatory">*</span>
        </div>

        <!-- Skill description input field -->
        <div class="text-field-with-title">
          <label for="description" class="field-label">DESCRIPTION</label>
          <textarea
            id="description"
            v-model="formData.description"
            class="text-field"
            rows="4"
            placeholder="Enter a detailed description of your skill"
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
        <button class="nav-button" @click="goNext">NEXT</button>
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
      skillsItems: [ 
        { name: 'JavaScript', description: 'Expert' },
        { name: 'CSS', description: 'Intermediate' }
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
    // Goes back to the previous section (Certifications)
    goBack() {
      this.$router.push('/certifications');
    },
    // Goes to the next section (Project)
    goNext() {
      this.$router.push('/project');
    }
  },
};
</script>

<style>
@import '@/assets/dark-mode.css';
</style>

  