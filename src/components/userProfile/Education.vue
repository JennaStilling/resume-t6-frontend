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
            <li v-for="(item, index) in educationItems" :key="index" class="dropdown-item">
              <!-- Display each institution's name -->
              <span class="university-name name">{{ item.name }}</span>
              <div class="icon-buttons">
                <img
                  src="@/assets/list-elements/edit-list-item.png"
                  alt="Edit"
                  class="icon"
                  @click.stop="editEntry(index)"
                />
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
            {{ educationItems[currentEducationIndex].name }}?
          </p>
          <p v-if="deleteError">
            Error deleting<br />
            {{ educationItems[currentEducationIndex].name }}.
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

<script>
export default {
  data() {
    return {
      showDropdown: true,
      formData: {
        degree: '',
        institution: '',
        gpa: '',
        graduation: '',
      },
      educationItems: [
        { name: 'Oklahoma Christian University' },
        { name: 'Hogwarts' },
        { name: 'Sky High' },
        { name: 'Starfleet Academy' },
        { name: "Xavier's School for Gifted Youngsters" }
      ],
      displayDelete: false,
      deleteError: false,
      currentEducationIndex: null,
    };
  },
  computed: {
    buttonLabel() {
      return this.$route.path.includes('/education/edit/') ? 'SAVE CHANGES' : 'ADD EDUCATION';
    },
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    editEntry(index) {
      this.$router.push({ path: `/education/edit/` });
    },
    showDeleteConfirmation(index) {
      this.currentEducationIndex = index;
      this.displayDelete = true;
    },
    deleteEducation() {
      try {
        this.educationItems.splice(this.currentEducationIndex, 1);
        this.currentEducationIndex = null;
        this.displayDelete = false;
      } catch (error) {
        this.deleteError = true;
      }
    },
    saveChanges() {
      // Save changes logic
    },
    goBack() {
      this.$router.push('/contact-info');
    },
    goNext() {
      this.$router.push('/experience');
    },
  },
};
</script>

<style>
@import '@/assets/dark-mode.css';
</style>