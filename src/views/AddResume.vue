<template>
  <!-- This is the left side of the screen where you can select resume items to add on pdf -->
  <div class="resume-builder">
    <div class="resume-sidebar">

      <!-- Title Section -->
      <div class="title-section">
        <label for="resumeTitle" class="title-label">Title:</label>
        <input
          v-model="resumeTitle"
          id="resumeTitle"
          class="title-input"
          placeholder="First Resume"
        />
        <button @click="downloadPDF">
            <img :src="downloadIcon" alt="download"/>
          </button>
      </div>

      <!-- Dropdown Sections -->
      <div v-for="(section, sectionKey) in dropdownSections" :key="sectionKey" class="dropdown-section">
        <div class="dropdown-header" @click="toggleDropdown(sectionKey)">
          <img
            class="section-icon"
            :src="getSectionIcon(sectionKey)"
            :alt="`${section.label} Icon`"
          />
          <span style="text-transform: capitalize;">{{ sectionKey }}</span>
          <img
            class="arrow-icon"
            :src="isDropdownOpen[sectionKey] ? dropDownUpIcon : dropDownIcon"
            alt="arrow"
          />
        </div>

        <div v-if="isDropdownOpen[sectionKey]" class="dropdown-content">

            <!-- Gets all the Section info -->
            <div v-if="dropdownSections[sectionKey].items.length" class="section-list">
            <div
              v-for="(item, index) in dropdownSections[sectionKey].items"
              :key="index"
              class="student-contact-info"
              @click="toggleCheckbox(item)"
            >
            <!-- EXAMPLE: CS, Oklahoma Christian University [✓] -->
              <div class="student-contact-info-inner">
              <div
                class="group-child"
                :class="{ 'selected': item.isSelected }"
              >
                <p v-if="sectionKey === 'education'">{{ item.degree }}, {{ item.institution }}</p>
                <p v-else-if="sectionKey === 'experience'">{{ item.role }}, {{ item.company }}</p>
                <p v-else-if="sectionKey === 'certifications'">{{ item.name }}, {{ item.company }}</p>
                <p v-else-if="sectionKey === 'skills'">{{ item.name }}</p>
                <p v-else-if="sectionKey === 'projects'">{{ item.name }}</p>
                <label class="custom-checkbox">
                <input type="checkbox" v-model="item.isSelected" @click.stop />
                <span class="checkmark"></span>
                </label>
              </div>
              </div>
            </div>
            </div>
            <p v-else>No {{ sectionKey }} data available.</p>
          </div>
          </div>
        </div>
    <!-- PDF Preview section -->
    <div class="pdf-preview">
        <iframe id="pdfPreview" ref="pdfPreview" width="700" height="100%"></iframe>
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
import projectServices from '../services/projectServices.js';
import Utils from '../config/utils';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import html2pdf from 'html2pdf.js';

 // Icons
import editPencilIcon from '@/assets/build-icons/edit-pencil.png';
import downloadIcon from '@/assets/build-icons/download.png';
import dropDownUpIcon from '@/assets/build-icons/drop-down-up.png';
import dropDownIcon from '@/assets/build-icons/drop-down.png';
import educationIcon from '@/assets/build-icons/education.png';
import experienceIcon from '@/assets/build-icons/experience.png';
import certsIcon from '@/assets/build-icons/certs.png';
import skillsIcon from '@/assets/build-icons/skills.png';
import projectIcon from '@/assets/build-icons/project.png';


export default {
  setup() {
    const user = Utils.getStore('user');
    const studentId = ref(null);
    const resumeTitle = ref('');
    const isDropdownOpen = ref({
      education: false,
      experience: false,
      certifications: false,
      skills: false,
      projects: false,
    });
    const dropdownSections = ref({
      education: { items: [] },
      experience: { items: [] },
      certifications: { items: [] },
      skills: { items: [] },
      projects: { items: [] },
    });
    const sectionIcons = {
      education: educationIcon,
      experience: experienceIcon,
      certifications: certsIcon,
      skills: skillsIcon,
      projects: projectIcon,
    };

    const getSectionIcon = (sectionKey) => {
      return sectionIcons[sectionKey] || '';
    };

    onMounted(() => {
      Utils.getUser(Utils.getStore('user')).then(user => {
        studentId.value = user.studentId;
        loadEducationData();
        loadExperienceData();
        loadCertificationData();
        loadSkillData();
        loadProjectData();
        // Load the initial PDF content in the iframe
        const iframe = document.querySelector("iframe");
        if (iframe) {
          iframe.addEventListener('load', () => {
            updatePDFPreview();
          });
          updatePDFPreview(); 
        } else {
          console.error('Iframe not found');
        }
      });
    });


    const updatePDFPreview = () => {
      const iframe = document.querySelector("iframe");
      if (iframe) {
        let doc = iframe.contentWindow || iframe.contentDocument;
        if (doc.document) doc = doc.document;
        doc.open();
        doc.write(generatePDFContent());
        doc.close();
      } else {
        console.error('updatePDFPreview does not work');
      }
    };


    const generatePDFContent = () => {
      const styles = `
      .content { font-family: Arial, sans-serif; }
      h1 { color: gray; }
    `;
      let content = `
        <html>
        <head>
          <style>${styles}</style>
        </head>
          <body>
            <div id="pdf-content" class="content">
              <h1>${user.fName} ${user.lName}'s Resume</h1>
              <p>Email: ${user.email}</p>
      `;

      // Add Education section
      const selectedEducation = dropdownSections.value.education.items.filter(item => item.isSelected);
      if (selectedEducation.length) {
        content += '<h2>Education</h2><ul>';
        selectedEducation.forEach(item => {
          const gpaText = Number.isInteger(item.gpa) ? `${item.gpa}.0` : item.gpa;
          const formattedDate = item.graduation_date ? new Date(item.graduation_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
          content += `<li>${item.degree}, ${item.institution}, GPA: ${gpaText}, ${formattedDate}</li>`;
        });
        content += '</ul>';
      }

      // Add Experience section
      const selectedExperience = dropdownSections.value.experience.items.filter(item => item.isSelected);
      if (selectedExperience.length) {
        content += '<h2>Experience</h2><ul>';
        selectedExperience.forEach(item => {
          const formattedDate = item.start_date ? new Date(item.start_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
          content += `<li>${item.role}, ${item.company}, ${formattedDate}</li>`;
        });
        content += '</ul>';
      }

      // Add Certifications section
      const selectedCertifications = dropdownSections.value.certifications.items.filter(item => item.isSelected);
      if (selectedCertifications.length) {
        content += '<h2>Certifications</h2><ul>';
        selectedCertifications.forEach(item => {
          content += `<li>${item.name}, ${item.company}, ${item.date_acquired}</li>`;
        });
        content += '</ul>';
      }

      // Add Skills section
      const selectedSkills = dropdownSections.value.skills.items.filter(item => item.isSelected);
      if (selectedSkills.length) {
        content += '<h2>Skills</h2><ul>';
        selectedSkills.forEach(item => {
          content += `<li>${item.name}</li>`;
        });
        content += '</ul>';
      }

      // Add Projects section
      const selectedProjects = dropdownSections.value.projects.items.filter(item => item.isSelected);
      if (selectedProjects.length) {
        content += '<h2>Projects</h2><ul>';
        selectedProjects.forEach(item => {
          content += `<li>${item.name}, ${item.description}</li>`;
        });
        content += '</ul>';
      }
      content += `
            </div>
          </body>
        </html>
      `;
      return content;
    };


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


    const loadProjectData = () => {
      projectServices.getAllProjects(studentId.value)
        .then(response => {
          dropdownSections.value.projects.items = response.data.map(item => ({
            ...item,
            isSelected: false
          }));
        })
        .catch(error => {
          console.error("Failed to fetch project data:", error);
        });
    };


    const toggleDropdown = (sectionKey) => {
      isDropdownOpen.value[sectionKey] = !isDropdownOpen.value[sectionKey];
    };


    const toggleCheckbox = (item) => {
      item.isSelected = !item.isSelected;
      updatePDFPreview(); // Update PDF preview when an item is selected/deselected
    };

    const downloadPDF = () => {
      // Create a temporary container for the HTML content
      const content = generatePDFContent();
      const container = document.createElement('div');
      container.innerHTML = content;

      // Append the container to the body temporarily
      document.body.appendChild(container);

      // Use html2pdf to generate and download the PDF
      html2pdf()
        .set({
          margin: 1,
          filename: resumeTitle.value || `${user.fName}_${user.lName}_Resume.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        })
        .from(container)
        .save()
        .then(() => {
          document.body.removeChild(container);
        });
    };

    const formatDate = (date) => {
      return date ? new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
    };

    return {
      studentId,
      isDropdownOpen,
      dropdownSections,
      toggleDropdown,
      toggleCheckbox,
      updatePDFPreview,
      editPencilIcon,
      dropDownUpIcon,
      dropDownIcon,
      downloadIcon,
      getSectionIcon,
      downloadPDF,
      resumeTitle
    };
  }
};
</script>


<style scoped>
@import '@/assets/view-resume.css';

.pdf-preview {
  margin-left: 70px;
  padding: 10px;
  background-color: #f3f3f3;
  max-width: 100%;
  height: 100vh;
  overflow: auto;
  border: 1px solid #ccc;
  font-size: 20px;
  margin-top: 20px;
}
</style>