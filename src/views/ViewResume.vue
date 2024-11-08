<template>
    <!--This is the left side of the screen where you can select resume items to add on pdf -->
    <div class="resume-builder">
      <div class="resume-sidebar">
        <div class="title-section">
          <label for="resumeTitle" class="title-label">Title:</label>
          <input
            v-model="resumeTitle"
            id="resumeTitle"
            class="title-input"
            placeholder="First Resume"
          />
          <img
            :src="editPencilIcon"
            alt="edit"
            class="edit-icon"
          />
        </div>
 
        <div v-for="(section, sectionKey) in dropdownSections" :key="sectionKey" class="dropdown-section">
          <div class="dropdown-header" @click="toggleDropdown(sectionKey)">
            <img
              class="section-icon"
              :src="section.icon"
              :alt="`${section.label} Icon`"
            />
            <span>{{ section.label }}</span>
            <img
              class="arrow-icon"
              :src="isDropdownOpen[sectionKey] ? dropDownUpIcon : dropDownIcon"
              alt="arrow"
            />
          </div>
 
          <div v-if="isDropdownOpen[sectionKey]" class="dropdown-content">


            <!-- Education Section -->
            <div v-if="sectionKey === 'education' && dropdownSections.education.items.length" class="education-list">
              <div
                v-for="(education, index) in dropdownSections.education.items"
                :key="index"
                class="student-contact-info"
                @click="toggleCheckbox(education)"
              >
                <div class="student-contact-info-inner">
                  <div
                    class="group-child"
                    :class="{ 'selected': education.isSelected }"
                  >
                    <p>{{ education.degree }}, {{ education.institution }}</p>
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
            <div v-if="sectionKey === 'experience' && dropdownSections.experience.items.length" class="experience-list">
              <div
                v-for="(experience, index) in dropdownSections.experience.items"
                :key="index"
                class="student-contact-info"
                @click="toggleCheckbox(experience)"
              >
                <div class="student-contact-info-inner">
                  <div
                    class="group-child"
                    :class="{ 'selected': experience.isSelected }"
                  >
                    <p>{{ experience.role }}, {{ experience.company }}</p>
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
            <div v-if="sectionKey === 'certifications' && dropdownSections.certifications.items.length" class="certification-list">
              <div
                v-for="(certification, index) in dropdownSections.certifications.items"
                :key="index"
                class="student-contact-info"
                @click="toggleCheckbox(certification)"
              >
                <div class="student-contact-info-inner">
                  <div
                    class="group-child"
                    :class="{ 'selected': certification.isSelected }"
                  >
                    <p>{{ certification.name }}, {{ certification.company }}</p>
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
            <div v-if="sectionKey === 'skills' && dropdownSections.skills.items.length" class="skills-list">
              <div
                v-for="(skill, index) in dropdownSections.skills.items"
                :key="index"
                class="student-contact-info"
                @click="toggleCheckbox(skill)"
              >
                <div class="student-contact-info-inner">
                  <div
                    class="group-child"
                    :class="{ 'selected': skill.isSelected }"
                  >
                    <p>{{ skill.name }}</p>
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
  // Services, etc...
  import { ref, onMounted } from 'vue';
  import educationServices from '../services/educationServices.js';
  import experienceServices from '../services/experienceServices.js';
  import certificationServices from '../services/certificationServices.js';
  import skillServices from '../services/skillServices.js';
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
      const studentId = ref('');
      const isDropdownOpen = ref({
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
 
      onMounted(() => {
        Utils.getUser(Utils.getStore('user')).then(user => {
          studentId.value = user.studentId;
          loadEducationData();
          loadExperienceData();
          loadCertificationData();
          loadSkillData();
        });
      });
 
      // LOAD ALL THE DATA BY CALLING THE SERVICES
      const loadEducationData = () => {
        educationServices.getAllEducations(studentId.value)
          .then(response => {
            dropdownSections.value.education.items = response.data.map(item => ({
              ...item,
              isSelected: false
            }));
          })
          .catch(error => {
            console.error("Failed to fetch education data:", error);
          });
      };
 
      const loadExperienceData = () => {
        experienceServices.getAllExperiences(studentId.value)
          .then(response => {
            dropdownSections.value.experience.items = response.data.map(item => ({
              ...item,
              isSelected: false
            }));
          })
          .catch(error => {
            console.error("Failed to fetch experience data:", error);
          });
      };
 
      const loadCertificationData = () => {
        certificationServices.getAllCertifications(studentId.value)
          .then(response => {
            dropdownSections.value.certifications.items = response.data.map(item => ({
              ...item,
              isSelected: false
            }));
          })
          .catch(error => {
            console.error("Failed to fetch certification data:", error);
          });
      };
 
      const loadSkillData = () => {
        skillServices.getAllSkills(studentId.value)
          .then(response => {
            dropdownSections.value.skills.items = response.data.map(item => ({
              ...item,
              isSelected: false
            }));
          })
          .catch(error => {
            console.error("Failed to fetch skills data:", error);
          });
      };
 
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