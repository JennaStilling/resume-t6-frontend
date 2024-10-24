<template>
  <div class="resume-builder">
    <div class="resume-sidebar">
      <div class="title-section">
        <label for="resumeTitle">Title:</label>
        <input v-model="resumeTitle" id="resumeTitle" class="title-input" placeholder="First Resume" />
        <img src="/src/assets/edit-pencil.png" alt="edit" class="edit-icon" />
      </div>
      
      <div v-for="(section, sectionKey) in dropdownSections" :key="sectionKey" class="dropdown-section">
        <div class="dropdown-header" @click="toggleDropdown(sectionKey)">
          <img class="section-icon" :src="section.icon" :alt="`${section.label} Icon`" />
          <span>{{ section.label }}</span>
          <img class="arrow-icon" :src="isDropdownOpen[sectionKey] ? '/src/assets/drop-down-up.png' : '/src/assets/drop-down.png'" alt="arrow" />
        </div>
        <div v-if="isDropdownOpen[sectionKey]" class="dropdown-content">
          <div class="student-contact-info" v-for="(value, key) in section.items" :key="key">
            <div :class="['student-contact-info-inner', { 'checked': section.items[key] }]">
              <input :id="key" type="checkbox" v-model="section.items[key]" @change="updatePreview(sectionKey, key, section.items[key])" />
              <label :for="key">{{ key.replace(/([A-Z])/g, ' $1').trim() }}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ResumePreview :selectedItems="structuredSelection" />
  </div>
</template>

<script>
import ResumePreview from './ResumePreview.vue';

export default {
  components: {
    ResumePreview
  },
  data() {
    return {
      resumeTitle: 'First Resume',
      isDropdownOpen: {
        contactInfo: false,
        education: false,
        experience: false,
        certifications: false,
        skills: false,
      },
      dropdownSections: {
        contactInfo: {
          label: 'Contact Info',
          icon: '/src/assets/build-icons/contact-info.png',
          items: {
            "Jake": false,
            "Peralta": false,
            "coolDetective@yahoo.com": false
          }
        },
        education: {
          label: 'Education',
          icon: '/src/assets/build-icons/education.png',
          items: {
            "Sky High": false,
            "East High": false,
            "Monsters Univ": false
          }
        },
        experience: {
          label: 'Experience',
          icon: '/src/assets/build-icons/experience.png',
          items: {
            "Sonic": false,
            "Computer Science Tutor": false,
          }
        },
        certifications: {
          label: 'Certifications',
          icon: '/src/assets/build-icons/certs.png',
          items: {
            "Security+": false,
            "Cloud+": false,
          }
        },
        skills: {
          label: 'Skills',
          icon: '/src/assets/build-icons/skills.png',
          items: {
            "Cooking": false,
            "Rock Climbing": false,
            "Guitar": false,
          }
        }
      },
      structuredSelection: {
        contactInfo: [],
        education: [],
        experience: [],
        certifications: [],
        skills: []
      }
    };
  },
  methods: {
    toggleDropdown(sectionKey) {
      this.isDropdownOpen[sectionKey] = !this.isDropdownOpen[sectionKey];
    },
    updatePreview(sectionKey, itemKey, isSelected) {
      if (isSelected) {
        if (!this.structuredSelection[sectionKey].includes(itemKey)) {
          this.structuredSelection[sectionKey].push(itemKey);
        }
      } else {
        this.structuredSelection[sectionKey] = this.structuredSelection[sectionKey].filter(
          i => i !== itemKey
        );
      }
    }
  }
};
</script>

<style scoped>
.resume-builder {
  display: flex;
}

.resume-sidebar {
  background-color: #021e2cff;
  padding: 20px;
  color: #ffffff;
}

.title-section {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.title-input {
  border: none;
  background-color: #ffffff;
  color: #1c1b1fff;
  border-radius: 4px;
  margin-left: 10px;
  padding: 5px;
}

.edit-icon {
  margin-left: 10px;
  width: 16px; 
  height: 16px; 
}

.dropdown-section {
  margin-bottom: 20px;
  background-color: #084565;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  width: 400px;
}

.dropdown-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 16px;
  font-size: large;
}

.section-icon {
  max-height: 35px;
  max-width: 30px;
}

.arrow-icon {
  width: 50px;
  height: 50px;
}

.dropdown-content {
  padding: 10px;
}

input[type="checkbox"] {
  margin-right: 10px;
}

.student-contact-info {
  width: 100%;
  position: relative;
  height: 56.7px;
  margin-bottom: 10px;
}

.student-contact-info-inner {
  position: absolute;
  top: 0;
  left: 0;
  width: 382px;
  height: 56.7px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  background-color: #0b547c;
  border: 1px solid #099ace;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding-left: 10px;
}

.student-contact-info-inner.checked {
  background-color: #021e2cff;
}
</style>