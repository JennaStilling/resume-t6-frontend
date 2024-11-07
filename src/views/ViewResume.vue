<template>
  <div class="resume-builder">

  <!-- Left side of the screen -->
    <div class="resume-sidebar">
      <!-- Input Filename -->
      <div class="title-section">
        <label for="resumeTitle">Filename:</label>
        <input v-model="resumeTitle" id="resumeTitle" class="title-input" placeholder="first-resume" />
        <img :src="editPencilIcon" alt="edit" class="edit-icon" />
      </div>

      <!-- Dropdown Sections for Each Resume Category -->
      <div v-for="(section, sectionKey) in dropdownSections" :key="sectionKey" class="dropdown-section">
        
        <!-- Header of Each Dropdown (example: Education) -->
        <div class="dropdown-header" @click="toggleDropdown(sectionKey)">
          <img class="section-icon" :src="section.icon" :alt="`${section.label} Icon`" />
          <span>{{ section.label }}</span>
          <img
            class="arrow-icon"
            :src="isDropdownOpen[sectionKey] ? dropDownUpIcon : dropDownIcon"
            alt="arrow"
          />
        </div>
        
        <!-- Content of Each Dropdown (example: CS, Oklahoma Christian University [✓] ) -->
        <div v-if="isDropdownOpen[sectionKey]" class="dropdown-content">
          <div v-if="section.items.length" class="list-section">
            
            <!-- Item List within Each Section (example: gets all skills) -->
            <div
              v-for="(item, index) in section.items"
              :key="index"
              class="student-contact-info"
              @click="toggleCheckbox(item)"
            >
              <div class="student-contact-info-inner">
                <div
                  class="group-child"
                  :class="{ 'selected': item.isSelected }"
                >
                  <p>{{ formatItem(sectionKey, item) }}</p>
                  <label class="custom-checkbox">
                    <input type="checkbox" v-model="item.isSelected" @click.stop />
                    <span class="checkmark"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <p v-else>No {{ section.label.toLowerCase() }} data available.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* Imports for Services and Icons */
import { ref, onMounted } from 'vue';
import educationServices from '@/services/educationServices';
import experienceServices from '@/services/experienceServices';
import certificationServices from '@/services/certificationServices';
import skillServices from '@/services/skillServices';
import Utils from '../config/utils';

// Icons
import editPencilIcon from '@/assets/build-icons/edit-pencil.png';
import dropDownUpIcon from '@/assets/build-icons/drop-down-up.png';
import dropDownIcon from '@/assets/build-icons/drop-down.png';
import educationIcon from '@/assets/build-icons/education.png';
import experienceIcon from '@/assets/build-icons/experience.png';
import certsIcon from '@/assets/build-icons/certs.png';
import skillsIcon from '@/assets/build-icons/skills.png';

export default {
  name: 'ViewResume',
  setup() {
    const resumeTitle = ref('');
    const authToken = ref('');
    const studentId = ref('');
    const user = ref(null);

    /* Keeps dropdowns closed until clicked on */
    const isDropdownOpen = ref({
      education: false,
      experience: false,
      certifications: false,
      skills: false,
    });

    /* Configuration of Dropdown Sections */
    const dropdownSections = ref({
      education: {
        label: 'Education',
        icon: educationIcon,
        items: [],
        service: educationServices.getAllEducations
      },
      experience: {
        label: 'Experience',
        icon: experienceIcon,
        items: [],
        service: experienceServices.getAllExperiences
      },
      certifications: {
        label: 'Certifications',
        icon: certsIcon,
        items: [],
        service: certificationServices.getAllCertifications
      },
      skills: {
        label: 'Skills',
        icon: skillsIcon,
        items: [],
        service: skillServices.getAllSkills
      }
    });

    /* Load User Data from Storage */
    onMounted(() => {
      const user = Utils.getStore('user');
      if (user) {
        authToken.value = user.token;
        studentId.value = user.studentId;
        
        // Fetch data for each category
        Object.keys(dropdownSections.value).forEach(fetchData);
      }
    });

    /* Fetch Data for Each Section */
    const fetchData = (sectionKey) => {
      if (!authToken.value) return;

      const section = dropdownSections.value[sectionKey];
      section.service(studentId.value)
        .then((res) => {
          section.items = res.data.map(item => ({
            ...item,
            isSelected: false
          }));
        })
        .catch((err) => {
          console.error(`Error fetching ${sectionKey} data:`, err);
        });
    };

    /* Toggle Dropdown Visibility */
    const toggleDropdown = (sectionKey) => {
      isDropdownOpen.value[sectionKey] = !isDropdownOpen.value[sectionKey];
    };

    /* Toggle Selection Checkbox */
    const toggleCheckbox = (item) => {
      item.isSelected = !item.isSelected;
    };

    /* Shows enough data for each item so the user can pick what they want on their resume */
    const formatItem = (sectionKey, item) => {
      const formats = {
        education: `${item.degree}, ${item.institution}`,
        experience: `${item.role}, ${item.company}`,
        certifications: `${item.name}, ${item.company}`,
        skills: `${item.name}`
      };
      return formats[sectionKey];
    };

    return {
      resumeTitle,
      editPencilIcon,
      dropDownUpIcon,
      dropDownIcon,
      isDropdownOpen,
      dropdownSections,
      toggleDropdown,
      toggleCheckbox,
      formatItem
    };
  }
};
</script>

<style scoped>
  @import '@/assets/view-resume.css';
</style>