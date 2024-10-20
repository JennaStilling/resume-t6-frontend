<template>
    <div class="container">
      <div class="sidebar">
        <div class="list">
          <div class="list-title" @click="toggleDropdown">Certification List ▼</div>
          <br>
          <div v-if="showDropdown" class="dropdown">
            <ul>
              <li v-for="(item, index) in certificationItems" :key="index" class="dropdown-item">
                <span class="certification-name name">{{ item.name }}</span>
                <div class="buttons">
                  <div class="edit-button" @click.stop="editEntry(index)">
                    <div class="edit-button-child"></div>
                    <b class="edit">EDIT</b>
                  </div>
                  <button class="delete-button" @click.stop="deleteEntry(index)">DELETE</button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
  
      <div class="main-content">
        <div class="form">
          <div class="text-field-with-title">
            <label for="certification" class="field-label">CERTIFICATION</label>
            <input
              type="text"
              id="certification"
              v-model="formData.certification"
              class="text-field"
              placeholder="Enter certification name"
              required
            />
            <span class="mandatory">*</span>
          </div>
          <div class="text-field-with-title">
            <label for="company" class="field-label">COMPANY</label>
            <input
              type="text"
              id="company"
              v-model="formData.company"
              class="text-field"
              placeholder="Enter company"
              required
            />
            <span class="mandatory">*</span>
          </div>
          <div class="text-field-with-title">
            <label for="date" class="field-label">DATE ACQUIRED</label>
            <input
              type="date"
              id="date"
              v-model="formData.date"
              class="text-field"
              required
            />
            <span class="mandatory">*</span>
          </div>
          <div class="save-button" @click="saveChanges">
            <div class="save-button-child"></div>
            <b class="save-changes">SAVE CHANGES</b>
          </div>
        </div>
  
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
        formData: {
          certification: '',
          company: '',
          date: '',
        },
        certificationItems: [
          { name: 'Security+' },
          { name: 'Cloud+' },
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
      goBack() {
        this.$router.push('/experience');
      },
      goNext() {
        this.$router.push('/skills');
      }
    },
  };
  </script>
  
  <style>
  @import '@/assets/dark-mode.css';
  </style>
  