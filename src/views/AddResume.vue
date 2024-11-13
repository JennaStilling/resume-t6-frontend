<template>
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
        <button @click="saveResume">
            <img :src="saveIcon" alt="save" class="save-button"/>
        </button>
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
        <div class="main-content">
          <PreviewBar @tab-change="handleTabChange" />
          <div class="pdf-preview" v-if="activeTab === 'preview'">
            <iframe id="pdfPreview" ref="pdfPreview" width="100%" height="100%"></iframe>
          </div>
          <div v-if="activeTab === 'template'">      
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
import projectServices from '../services/projectServices.js';
import Utils from '../config/utils';
import html2pdf from 'html2pdf.js';
import PreviewBar from '@/components/PreviewBar.vue';
import resumeServices from '../services/resumeServices.js'
import resumeEducationServices from '../services/resumeEducationServices.js';
import resumeExperienceServices from '../services/resumeExperienceServices.js';
import resumeCertificationServices from '../services/resumeCertificationServices.js';
import resumeSkillServices from '../services/resumeSkillServices.js';
import resumeProjectServices from '../services/resumeProjectServices.js';

 // Icons
import editPencilIcon from '@/assets/build-icons/edit-pencil.png';
import downloadIcon from '@/assets/build-icons/download.png';
import saveIcon from '@/assets/build-icons/saveIcon.png';
import dropDownUpIcon from '@/assets/build-icons/drop-down-up.png';
import dropDownIcon from '@/assets/build-icons/drop-down.png';
import educationIcon from '@/assets/build-icons/education.png';
import experienceIcon from '@/assets/build-icons/experience.png';
import certsIcon from '@/assets/build-icons/certs.png';
import skillsIcon from '@/assets/build-icons/skills.png';
import projectIcon from '@/assets/build-icons/project.png';


export default {
  components: {
    PreviewBar,
  },
  setup() {
    const user = Utils.getStore('user');
    const studentId = ref(null);
    const resumeTitle = ref('');
    const resume = ref({
      name: null,
      template_type: null
    });
    const resumeId = ref(null);
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

    const activeTab = ref('preview');

    function handleTabChange(tab) {
      console.log('Tab changed to:', tab);
      console.log(dropdownSections.value);
      activeTab.value = tab;
      if (tab === 'preview') {
        setTimeout(() => {
          const iframe = document.querySelector("iframe");
          if (iframe) {
            updatePDFPreview();
          } else {
            console.error('Iframe not found for PDF preview when handling tab change');
          }
        }, 0); // Delay for Document Object Model (DOM) to update, had error where iframe wasn't found
      }
    }

    const updatePDFPreview = () => {
      const iframe = document.querySelector("iframe");
      if (iframe) {
        let doc = iframe.contentWindow || iframe.contentDocument;
        if (doc.document) doc = doc.document;
        try {
          doc.open();
          doc.write(generatePDFContent());
          doc.close();
        } catch (error) {
          console.error('Error updating PDF preview:', error);
        }
      } else {
        console.error('Iframe not found when updating');
      }
    };


    const generatePDFContent = () => {
      const styles = `
      .content { font-family: 'Times New Roman', Times, serif; }
      h1 {
        color: black;
        text-align: center;
      }
      h2{
        margin-left: 0;
        margin-right: 0;
        padding-left: 0;
        padding-right: 0;
      }
      h4{
        text-align: center;
        font-weight: normal;
      }
      ul {
       list-style-type: none;
      }
      ol {
        list-style-type: decimal;
      }
    `;
    let content = `
        <html>
        <head>
          <style>${styles}</style>
        </head>
          <body>
            <div id="pdf-content" class="content">
              <h1>${user.fName} ${user.lName}</h1>
              <h4>${user.email}</h4>
      `;

      // Add Education section
      const selectedEducation = dropdownSections.value.education.items.filter(item => item.isSelected);
      if (selectedEducation.length) {
        content += '<h2>Education</h2><hr><ul>';
        selectedEducation.forEach(item => {
          const gpaText = Number.isInteger(item.gpa) ? `${item.gpa}.0` : item.gpa;
          const formattedDate = item.graduation_date ? new Date(item.graduation_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
          content += `<li style="display: flex; justify-content: space-between;">
              <strong>${item.institution}</strong>
              <span>Graduation:</span>
            </li>`;
          content += `<li style="display: flex; justify-content: space-between;">
              <em>${item.degree}</em>
              <span>${formattedDate}   </span>
            </li>`;
          content += `<li>GPA: ${gpaText}</li>`;
          content += `<div style="height: 5px;"></div>`;
        });
        content += '</ul>';
      }

        // Add Experience section
        const selectedExperience = dropdownSections.value.experience.items.filter(item => item.isSelected);
      if (selectedExperience.length) {
        content += '<h2>Experience</h2><hr><ul>';
        selectedExperience.forEach(item => {
          const startDate = item.start_date ? new Date(item.start_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : '';
          const endDate = item.end_date ? new Date(item.end_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : '';
          const roleCompany =`${item.role}, ${item.company}`;
         
          content += `<li style="display: flex; justify-content: space-between;">
              <strong>${roleCompany}</strong>
              <span> ${startDate} - ${endDate}</span>
            </li>`;
          content += `<li> • ${item.job_description}</li>`;
        });
        content += '</ul>';
      }

      // Add Certifications section
      const selectedCertifications = dropdownSections.value.certifications.items.filter(item => item.isSelected);
      if (selectedCertifications.length) {
        content += '<h2>Certifications</h2><hr><ul>';
        selectedCertifications.forEach(item => {
          const formattedDate = item.date_acquired ? new Date(item.date_acquired).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : '';
          content += `<li style="display: flex; justify-content: space-between;">
          <strong>${item.name}</strong>
          <span>Date Acquired:</span>
        </li>`;
          content += `<li style="display: flex; justify-content: space-between;">
          <em>${item.company}</em> 
          <span>${formattedDate}</span>
          </li>`; 
          content += `<div style="height: 5px;"></div>`;
        });
        content += '</ul>';
      }

      // Add Skills section
      const selectedSkills = dropdownSections.value.skills.items.filter(item => item.isSelected);
      if (selectedSkills.length) {
        content += '<h2>Skills</h2><hr><ol>';
        selectedSkills.forEach(item => {
          content += `<li><b>${item.name}</b>`;
          if (item.description) {
        content += `: ${item.description}`;
          }
          content += `</li>`;
        });
        content += '</ol>';
        content += `<div style="height: 5px;"></div>`;
      }

    // Add Projects section
    const selectedProjects = dropdownSections.value.projects.items.filter(item => item.isSelected);
    if (selectedProjects.length) {
      content += '<h2>Projects</h2><hr><ol>';
      selectedProjects.forEach(item => {
        content += `<li><b>${item.name}</b>`;
        if (item.description) {
          content += `: ${item.description}`;
        }
        content += `</li>`;
      });
      content += '</ol>';
      content += `<div style="height: 5px;"></div>`;
    }
    content += `
          </div>
        </body>
      </html>
    `;
    return content;
  };

    // Loads all the section data
    const loadData = (service, sectionKey) => {
      service(studentId.value)
      .then(response => {
        dropdownSections.value[sectionKey].items = response.data.map(item => ({
        ...item,
        isSelected: false
        }));
      })
      .catch(error => {
        console.error(`Failed to fetch ${sectionKey} data:`, error);
      });
    };

    const loadEducationData = () => loadData(educationServices.getAllEducations, 'education');
    const loadExperienceData = () => loadData(experienceServices.getAllExperiences, 'experience');
    const loadCertificationData = () => loadData(certificationServices.getAllCertifications, 'certifications');
    const loadSkillData = () => loadData(skillServices.getAllSkills, 'skills');
    const loadProjectData = () => loadData(projectServices.getAllProjects, 'projects');

    const toggleDropdown = (sectionKey) => {
      isDropdownOpen.value[sectionKey] = !isDropdownOpen.value[sectionKey];
    };

    const toggleCheckbox = (item) => {
      item.isSelected = !item.isSelected;
      updatePDFPreview(); 
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

    function saveResume() {
      resume.value.name = resumeTitle;
      resume.value.template_type = 1;

      resumeServices.createResume(studentId.value, resume.value)
        .then((res) => {
          resumeId.value = res.data.id;
          addResumeInfo();
          // Should reroute to student homepage
        })
        .catch((error) => {
          if (error.response && error.response.status === 406) {
            message.value = "Error: " + error.code + ":" + error.message;
            console.log(error);
          } else {
            console.log(error);
          }
        });
    }

    function addResumeInfo() {
      const selectedEducation = dropdownSections.value.education.items.filter(item => item.isSelected);
      const selectedExperience = dropdownSections.value.experience.items.filter(item => item.isSelected);
      const selectedCertifications = dropdownSections.value.certifications.items.filter(item => item.isSelected);
      const selectedSkills = dropdownSections.value.skills.items.filter(item => item.isSelected);
      const selectedProjects = dropdownSections.value.projects.items.filter(item => item.isSelected);

      selectedEducation.forEach(item => {
          resumeEducationServices.createResumeEducation(resumeId.value, item.id, {})
          .then(() => {
            console.log("Education added to resume successfully");
          })
          .catch((error) => {
            if (error.response && error.response.status === 406) {
              message.value = "Error: " + error.code + ":" + error.message;
              console.log(error);
            } else {
              console.log(error);
            }
          });
        });

        selectedExperience.forEach(item => {
          resumeExperienceServices.createResumeExperience(resumeId.value, item.id, {})
            .then(() => {
              console.log("Experience added to resume successfully");
            })
            .catch((error) => {
              if (error.response && error.response.status === 406) {
                message.value = "Error: " + error.code + ":" + error.message;
                console.log(error);
              } else {
                console.log(error);
              }              
            });
        });

        selectedCertifications.forEach(item => {
          resumeCertificationServices.createResumeCertification(resumeId.value, item.id, {})
            .then(() => {
              console.log("Certification added successfully to resume");
            })
            .catch((error) => {
              if (error.response && error.response.status === 406) {
                message.value = "Error: " + error.code + ":" + error.message;
                console.log(error);
              } else {
                console.log(error);
              }
            })
        })

        selectedSkills.forEach(item => {
          resumeSkillServices.createResumeSkill(resumeId.value, item.id, {})
            .then(() => {
              console.log("Skill added to resume successfully");
            })
            .catch((error) => {
              if (error.response && error.response.status === 406) {
                message.value = "Error: " + error.code + ":" + error.message;
                console.log(error);
              } else {
                console.log(error);
              }
            });
        });

        selectedProjects.forEach(item => {
          resumeProjectServices.createResumeProject(resumeId.value, item.id, {})
            .then(() => {
              console.log("Project added to resume successfully");
            })
            .catch((error) => {
              if (error.response && error.response.status === 406) {
                message.value = "Error: " + error.code + ":" + error.message;
                console.log(error);
              } else {
                console.log(error);
              }
            });
        });
    }

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
      saveIcon,
      getSectionIcon,
      downloadPDF,
      saveResume,
      resumeTitle,
      activeTab,
      handleTabChange
    };
  }
};
</script>


<style scoped>
@import '@/assets/view-resume.css';
</style>