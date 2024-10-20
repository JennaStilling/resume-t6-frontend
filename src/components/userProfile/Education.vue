<template>
  <div class="education-container container">
    <div class="sidebar">
      <div class="education-list list">
        <!--EDUCATION LIST ON LEFT SIDE-->
        <div class="list-title" @click="toggleDropdown">Education List ▼</div>
        <br>
        <div v-if="showDropdown" class="dropdown">
          <ul>
            <li v-for="(item, index) in educationItems" :key="index" class="dropdown-item">
              <!-- Display each institution's name -->
              <span class="university-name name">{{ item.name }}</span>
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

    <!-- Main form for entering education details -->
    <div class="main-content">
      <div class="form">
        <!-- Degree input field -->
        <div class="text-field-with-title">
          <label for="degree" class="field-label">DEGREE</label>
          <input
            type="text"
            id="degree"
            v-model="formData.degree"
            class="text-field"
            placeholder="Enter your degree"
            required
          />
          <span class="mandatory">*</span>
        </div>
        <!-- Institution input field -->
        <div class="text-field-with-title">
          <label for="institution" class="field-label">INSTITUTION</label>
          <input
            type="text"
            id="institution"
            v-model="formData.institution"
            class="text-field"
            placeholder="Enter the institution name"
            required
          />
          <span class="mandatory">*</span>
        </div>
        <!-- GPA input field -->
        <div class="text-field-with-title">
          <label for="gpa" class="field-label">GPA</label>
          <input
            type="number"
            id="gpa"
            v-model="formData.gpa"
            class="text-field"
            placeholder="Enter your GPA"
            step="0.01"
            required
          />
          <span class="mandatory">*</span>
        </div>
        <!-- Graduation date input field -->
        <div class="text-field-with-title">
          <label for="graduation" class="field-label">GRADUATION</label>
          <input
            type="date"
            id="graduation"
            v-model="formData.graduation"
            class="text-field"
            required
          />
          <span class="mandatory">*</span>
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
        degree: 'B.S Computer Science',  
        institution: 'Oklahoma Christian University', 
        gpa: '3.97',
        graduation: '2025-06-12',
      },
      educationItems: [  
        { name: 'Oklahoma Christian University' },
        { name: 'Hogwarts' },
        { name: 'Sky High' }
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
      // Save changes logic
    },

     // NAVIGATE TO PAGES:
    // Goes back to the previous page (Contact Info)
    goBack() {
      this.$router.push('/contact-info');
    },
    // Goes to the next section (Experience)
    goNext() {
      this.$router.push('/experience');
    }
  },
};
</script>

<style>
@import '@/assets/dark-mode.css';
</style>
