<template>
  <div class="resume-builder">
    <div class="resume-sidebar">
      <div class="title-section">
        <label for="resumeTitle">Title:</label>
        <input v-model="resumeTitle" id="resumeTitle" class="title-input" placeholder="First Resume" />
        <img :src="editPencilIcon" alt="edit" class="edit-icon" />
      </div>

      <div v-for="(section, sectionKey) in dropdownSections" :key="sectionKey" class="dropdown-section">
        <div class="dropdown-header" @click="toggleDropdown(sectionKey)">
          <img class="section-icon" :src="section.icon" :alt="`${section.label} Icon`" />
          <span>{{ section.label }}</span>
          <img
            class="arrow-icon"
            :src="isDropdownOpen[sectionKey] ? dropDownUpIcon : dropDownIcon"
            alt="arrow"
          />
        </div>
       
        <div v-if="isDropdownOpen[sectionKey]" class="dropdown-content">
          <!-- Education Section -->
          <div v-if="sectionKey === 'education' && section.items.length" class="education-list">
            <div
              v-for="(education, index) in section.items"
              :key="index"
              class="student-contact-info"
              @click="toggleCheckbox(education)"
            >
              <div class="student-contact-info-inner">
                <div
                  class="group-child"
                  :class="{ 'selected': education.isSelected }"
                >
                  <p> {{ education.degree }}, {{ education.institution }}</p>
                  <label class="custom-checkbox">
                    <input type="checkbox" v-model="education.isSelected" @click.stop />
                    <span class="checkmark"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <p v-else-if="sectionKey === 'education'">No education data available.</p>

          <!-- Experience Section -->
          <div v-if="sectionKey === 'experience' && section.items.length" class="experience-list">
            <div
              v-for="(experience, index) in section.items"
              :key="index"
              class="student-contact-info"
              @click="toggleCheckbox(experience)"
            >
              <div class="student-contact-info-inner">
                <div
                  class="group-child"
                  :class="{ 'selected': experience.isSelected }"
                >
                  <p> {{ experience.role }}, {{ experience.company }}</p>
                  <label class="custom-checkbox">
                    <input type="checkbox" v-model="experience.isSelected" @click.stop />
                    <span class="checkmark"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <p v-else-if="sectionKey === 'experience'">No experience data available.</p>

          <!-- Certification Section -->
          <div v-if="sectionKey === 'certifications' && section.items.length" class="certification-list">
            <div
              v-for="(certification, index) in section.items"
              :key="index"
              class="student-contact-info"
              @click="toggleCheckbox(certification)"
            >
              <div class="student-contact-info-inner">
                <div
                  class="group-child"
                  :class="{ 'selected': certification.isSelected }"
                >
                  <p> {{ certification.name }}, {{ certification.company }}</p>
                  <label class="custom-checkbox">
                    <input type="checkbox" v-model="certification.isSelected" @click.stop />
                    <span class="checkmark"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <p v-else-if="sectionKey === 'certifications'">No certification data available.</p>

          <!-- Skills Section -->
          <div v-if="sectionKey === 'skills' && section.items.length" class="skills-list">
            <div
              v-for="(skill, index) in section.items"
              :key="index"
              class="student-contact-info"
              @click="toggleCheckbox(skill)"
            >
              <div class="student-contact-info-inner">
                <div
                  class="group-child"
                  :class="{ 'selected': skill.isSelected }"
                >
                  <p> {{ skill.name }}</p>
                  <label class="custom-checkbox">
                    <input type="checkbox" v-model="skill.isSelected" @click.stop />
                    <span class="checkmark"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <p v-else-if="sectionKey === 'skills'">No skills data available.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import Utils from '../config/utils';

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

    const isDropdownOpen = ref({
      contactInfo: false,
      education: false,
      experience: false,
      certifications: false,
      skills: false,
    });

    const dropdownSections = ref({
      education: {
        label: 'Education',
        icon: educationIcon,
        items: []
      },
      experience: {
        label: 'Experience',
        icon: experienceIcon,
        items: []
      },
      certifications: {
        label: 'Certifications',
        icon: certsIcon,
        items: []
      },
      skills: {
        label: 'Skills',
        icon: skillsIcon,
        items: []
      }
    });

    user.value = Utils.getStore("user");
    if (user.value) {
      authToken.value = user.value.token;
      studentId.value = user.value.studentId;
    }

    const fetchEducationData = async () => {
      if (!authToken.value) return;

      try {
        const response = await fetch('http://localhost:3026/resume-t6/student/${studentId.value}/education/', {
          headers: {
            'Authorization': `Bearer ${authToken.value}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch education data');
        }

        const educationData = await response.json();
        dropdownSections.value.education.items = educationData.map(item => ({
          ...item,
          isSelected: false
        }));
      } catch (error) {
        console.error('Error fetching education data:', error);
      }
    };

    const fetchExperienceData = async () => {
      if (!authToken.value) return;

      try {
        const response = await fetch('http://localhost:3026/resume-t6/student/${studentId.value}/experience/', {
          headers: {
            'Authorization': `Bearer ${authToken.value}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch experience data');
        }

        const experienceData = await response.json();
        dropdownSections.value.experience.items = experienceData.map(item => ({
          ...item,
          isSelected: false
        }));
      } catch (error) {
        console.error('Error fetching experience data:', error);
      }
    };

    const fetchCertificationData = async () => {
      if (!authToken.value) return;

      try {
        const response = await fetch('http://localhost:3026/resume-t6/student/${studentId.value}/certification/', {
          headers: {
            'Authorization': `Bearer ${authToken.value}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch certification data');
        }

        const certificationData = await response.json();
        dropdownSections.value.certifications.items = certificationData.map(item => ({
          ...item,
          isSelected: false
        }));
      } catch (error) {
        console.error('Error fetching certification data:', error);
      }
    };

    const fetchSkillsData = async () => {
      if (!authToken.value) return;

      try {
        const response = await fetch('http://localhost:3026/resume-t6/student/${studentId.value}/skill/', {
          headers: {
            'Authorization': `Bearer ${authToken.value}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch skills data');
        }

        const skillsData = await response.json();
        dropdownSections.value.skills.items = skillsData.map(item => ({
          ...item,
          isSelected: false
        }));
      } catch (error) {
        console.error('Error fetching skills data:', error);
      }
    };

    onMounted(() => {
      fetchEducationData();
      fetchExperienceData();
      fetchCertificationData();
      fetchSkillsData();
    });

    const toggleDropdown = (sectionKey) => {
      isDropdownOpen.value[sectionKey] = !isDropdownOpen.value[sectionKey];
    };

    const toggleCheckbox = (item) => {
      item.isSelected = !item.isSelected;
    };

    return {
      resumeTitle,
      editPencilIcon,
      dropDownUpIcon,
      dropDownIcon,
      isDropdownOpen,
      dropdownSections,
      toggleDropdown,
      toggleCheckbox
    };
  }
};
</script>

<style scoped>
  @import '@/assets/view-resume.css';
</style>  