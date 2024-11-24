<template>
    <div class="resume-container">
        <!-- Resume Title -->
      <div class="header" v-if="resume">
        <button class="back-button" @click="returnToInbox()">&#x2190;</button>
        <h1 style="color:black;">{{ resume.name }}</h1>
      </div>
      <div class="content">
        <!-- The resume -->
        <div class="resume-pdf">
            <iframe id="pdfPreview" ref="pdfPreview" width="100%" height="100%"></iframe>
        </div>
        <!-- Right Side -->
        <div class="email-section">
            <!-- Student Message to reviewer -->
          <div class="email-box" v-if="studentUser && resumeReview">
            <p><strong>{{ studentUser.fName + ' ' + studentUser.lName }} &lt;{{ studentUser.email }}&gt;</strong></p>
            <p>{{ resumeReview.notes }}</p>
          </div>
          <!-- Where the Reviewer will write their suggestions -->
          <div class="comments-section">
            <label for="comments">Comments:</label>
            <textarea id="comments" v-model="reviewSuggestions" placeholder="Feedback..."></textarea>
          </div>
          <!-- Requesting an in-person metting (Stretch Goal?) -->
          <!-- <div class="options">
            <input type="checkbox" id="inPersonMeeting" />
            <label for="inPersonMeeting">Request in-person meeting</label>
          </div> -->
          <button class="send-button" @click="submitReview()">SEND</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import userResumeReviewServices from '@/services/userResumeReviewServices';
  import resumeReviewServices from '@/services/resumeReviewServices';
  import resumeServices from '@/services/resumeServices';
  import resumeCertificationServices from '@/services/resumeCertificationServices';
  import resumeEducationServices from '@/services/resumeEducationServices';
  import resumeExperienceServices from '@/services/resumeExperienceServices';
  import resumeProjectServices from '@/services/resumeProjectServices';
  import resumeSkillServices from '@/services/resumeSkillServices';
  import educationServices from '@/services/educationServices';
  import experienceServices from '@/services/experienceServices';
  import certificationServices from '@/services/certificationServices';
  import projectServices from '@/services/projectServices';
  import skillServices from '@/services/skillServices';
  import { loadTemplateOne } from '@/services/templates/templateOne.js';
  import { loadTemplateTwo } from '@/services/templates/templateTwo.js';
  import { loadTemplateThree} from '@/services/templates/templateThree.js';
  import { loadTemplateFour } from '@/services/templates/templateFour.js';
  import { loadTemplateFive } from '@/services/templates/templateFive.js';
  import { loadTemplateSix } from '@/services/templates/templateSix.js';
  import { loadTemplateSeven } from '@/services/templates/templateSeven';
  import userServices from '@/services/userServices';
  import Utils from '@/config/utils';

  const router = useRouter();
  const studentUser = ref(null);
  const resumeReview = ref(null);
  const resume = ref(null);
  const reviewSuggestions = ref("");
  const dropdownSections = ref({
      education: { items: [] },
      experience: { items: [] },
      certifications: { items: [] },
      skills: { items: [] },
      projects: { items: [] },
    });

  const path = window.location.pathname;
  const match = path.match(/\/review-resume\/(\d+)$/);
  const resumeReviewId = ref(match ? Number(match[1]) : null);

  onMounted(() => {
    getResumeReview();
  });

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
      const sections = dropdownSections.value;
      switch (resume.value.template_type) {
        case 1:
          return loadTemplateOne(studentUser.value, sections);
        case 2:
          return loadTemplateTwo(studentUser.value, sections);
        case 3:
          return loadTemplateThree(studentUser.value, sections);
        case 4:
          return loadTemplateFour(studentUser.value, sections);
        case 5:
          return loadTemplateFive(studentUser.value, sections);
        case 6:
          return loadTemplateSix(studentUser.value, sections);
        case 7:
          return loadTemplateSeven(studentUser.value, sections);
        default:
          return loadTemplateOne(studentUser.value, sections);
      }
    };

  const getResumeReview = () => {
    resumeReviewServices.getResumeReviewById(resumeReviewId.value)
        .then((res) => {
            resumeReview.value = res.data;
            // With the resume Review
            getStudentUser();
            getResume();
        })
        .catch((error) => {
            console.log(error);
        });
  };

  const getResume = () => {
    resumeServices.getResumeAsReviewer(resumeReview.value.id)
        .then((res) => {
            resume.value = res.data[0];
            // Get the Resume Data here
            loadEducationData();
            loadExperienceData()
            loadCertificationData();
            loadSkillData()
            loadProjectData();
        })
        .catch((error) => {
            console.log(error);
        })
  };

  const getStudentUser = () => {
    userServices.getAllStudentUsers(resumeReview.value.studentId)
        .then((res) => {
            studentUser.value = res.data[0];
        })
        .catch((error) => {
            console.log(error);
        })
  };

  const loadData = (service, sectionKey, resumeService) => {
      service(resumeReview.value.studentId)
        .then(response => {
          dropdownSections.value[sectionKey].items = response.data.map(item => ({
            ...item,
            isSelected: false
          }));
          resumeService(resume.value.id)
            .then((response) => {
              response.data.forEach(item => {
                dropdownSections.value[sectionKey].items.forEach(obj => {
                  if (sectionKey === "education") if (obj.id === item.educationId) obj.isSelected = true;
                  if (sectionKey === "experience") if (obj.id === item.experienceId) obj.isSelected = true;
                  if (sectionKey === "certifications") if (obj.id === item.certificationId) obj.isSelected = true;
                  if (sectionKey === "skills") if (obj.id === item.skillId) obj.isSelected = true;
                  if (sectionKey === "projects") if (obj.id === item.projectId) obj.isSelected = true;
                })
              });
              updatePDFPreview();
            })
            .catch((error) => {
              if (error.response && error.response.status === 406) {
                message.value = "Error: " + error.code + ":" + error.message;
                console.log(error);
              } else {
                console.log(error);
              }
            });
        })
        .catch(error => {
          console.error(`Failed to fetch ${sectionKey} data:`, error);
        });
    };

    const loadEducationData = () => loadData(educationServices.getAllEducations, 'education', resumeEducationServices.getAllResumeEducations);
    const loadExperienceData = () => loadData(experienceServices.getAllExperiences, 'experience', resumeExperienceServices.getAllResumeExperiences);
    const loadCertificationData = () => loadData(certificationServices.getAllCertifications, 'certifications', resumeCertificationServices.getAllResumeCertifications);
    const loadSkillData = () => loadData(skillServices.getAllSkills, 'skills', resumeSkillServices.getAllResumeSkills);
    const loadProjectData = () => loadData(projectServices.getAllProjects, 'projects', resumeProjectServices.getAllResumeProjects);

    const submitReview = () => {
        // Update resumeReview
        resumeReview.value.suggestion = reviewSuggestions.value;
        resumeReview.value.status = "reviewed";
        updateReview();
        // Return to ReviewerInbox
        returnToInbox();
    };

    const updateReview = () => {
        resumeReviewServices.updateResumeReview(resumeReview.value.studentId, resumeReview.value.id, resumeReview.value)
            .then((res) => {
                console.log("Suggestions added to resume review");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const returnToInbox = () => {
      router.push({ name: 'review-inbox'});
    }
  </script>
  
  <style scoped>
  .resume-container {
    margin-top: 10px;
    background-color: #cfe0e8;
    padding: 20px;
    border-radius: 35px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .header {
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
  }
  
  .back-button {
    background: linear-gradient(90deg, #7B1329 0%, #E1234B 100%);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    color: white;
    border: none;
    border-radius: 15px;
    width: 40px;
    height: 40px;
    font-size: 20px;
    margin-right: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .content {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  
  .resume-pdf {
    flex: 1;
    margin-left: 50px;
    margin-right: 50px;
    background-color: white;
  }
  
  .email-section {
    flex: 1;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .email-box {
    margin-bottom: 20px;
    padding: 10px;
    background-color: #f0f0f0;
    border-radius: 5px;
  }
  
  .comments-section {
    margin-bottom: 20px;
  }
  
  textarea {
    width: 100%;
    height: 100px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  .options {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .send-button {
    background-color: #007bff;
    color: #021E2C;
    font-weight: 800;
    border: none;
    padding: 7px 10px;
    border-radius: 5px;
    background: linear-gradient(90deg, #118ACB 0%, #69CBFF 100%);
    border: 4px #084565 solid;
    cursor: pointer;
  }
  
  .inPersonMeeting {
    margin-right: 10px;
    padding: 10px;
  }
  </style> 