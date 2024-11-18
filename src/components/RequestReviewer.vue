<template>
    <div class="modal">
        <div class="modal-content">
            <span @click="toggleRequest()" class="close">&times;</span>

            <div class="modal-header">
                <p style="font-weight: bold;">{{ message }}</p>
                <p style="font-weight: bold; color: red">{{ error }}</p>

                <div class="shortcuts">
                    <Dropdown class="dropdown" @visible-change="isReviewerDropdown = !isReviewerDropdown">
                        <template #trigger>
                            <button type="button" class="dropdown-button">
                                {{ selectedReviewer ? `${selectedReviewer.fName} ${selectedReviewer.lName}` : 'REVIEWER' }}
                                <span class="dropdown-arrow">{{ isReviewerDropdown ? '▲' : '▼' }}</span>
                            </button>
                        </template>
                        <div style="background-color: white; color: black; padding: 10px;">
                            <!-- Search Input -->
                            <input 
                                type="text" 
                                v-model="searchQueryReviewer" 
                                placeholder="Search reviewers..." 
                                style="width: 100%; padding: 5px; margin-bottom: 10px; border: 1px solid #ccc;" 
                            />
                            <!-- Filtered List -->
                            <ul>
                                <li
                                    class="list-item"
                                    v-for="reviewer in filteredReviewers" 
                                    :key="reviewer.id" 
                                    @click="() => selectReviewer(reviewer)"
                                    style="padding: 5px 0;">
                                    {{ reviewer.fName }} {{ reviewer.lName }}
                                </li>
                                <!-- No Results Message -->
                                <li v-if="filteredReviewers.length === 0" style="color: gray; text-align: center;">
                                    No reviewers found
                                </li>
                            </ul>
                        </div>
                    </Dropdown>

                    <Dropdown class="dropdown" @visible-change="isResumeDropdown = !isResumeDropdown">
                        <template #trigger>
                            <button type="button" class="dropdown-button">
                                {{ selectedResume ? `${selectedResume.name}` : 'RESUME' }}
                                <span class="dropdown-arrow">{{ isResumeDropdown ? '▲' : '▼' }}</span>
                            </button>
                        </template>
                        <div style="background-color: white; color: black; padding: 10px;">
                            <!-- Search Input -->
                            <input 
                                type="text" 
                                v-model="searchQueryResume" 
                                placeholder="Search resumes..." 
                                style="width: 100%; padding: 5px; margin-bottom: 10px; border: 1px solid #ccc;" 
                            />
                            <!-- Filtered List -->
                            <ul>
                                <li
                                    class="list-item"
                                    v-for="resume in filteredResumes" 
                                    :key="resume.id" 
                                    @click="() => selectResume(resume)"
                                    style="padding: 5px 0;">
                                    {{ resume.name }}
                                </li>
                                <!-- No Results Message -->
                                <li v-if="filteredResumes.length === 0" style="color: gray; text-align: center;">
                                    No resumes found
                                </li>
                            </ul>
                        </div>
                    </Dropdown>
                </div>

                <textarea
                    id="notes"
                    v-model="reviewNotes"
                    class="text-notes"
                    placeholder="What job is the resume for?"
                ></textarea>
                
                <div @click="submitReview()" class="submit-button">
                    SUBMIT
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import Dropdown from 'v-dropdown';
import { ref, onMounted, computed, watch } from "vue";
import resumeServices from "@/services/resumeServices";
import userServices from "@/services/userServices";
import resumeReviewServices from '@/services/resumeReviewServices';
import userResumeReviewServices from '@/services/userResumeReviewServices';
import Utils from '@/config/utils.js';

const emit = defineEmits(["toggleRequest"]);

const user = Utils.getStore("user");
const studentId = ref();
const reviewers = ref([]);
const resumes = ref([]);
const searchQueryReviewer = ref("");
const searchQueryResume = ref("");
const selectedReviewer = ref(null);
const selectedResume = ref(null);
const resumeReviewId = ref(null);
const isReviewerDropdown = ref(false);
const isResumeDropdown = ref(false);
const reviewNotes = ref("");
const message = ref("Select a Resume and its Reviewer");
const error = ref("");

onMounted(() => {
  Utils.getUser(user).then(value => {
    studentId.value = value.studentId;
    getReviewers();
    getResumes();
  });
});

// Filtered reviewers list based on search query
const filteredReviewers = computed(() =>
  reviewers.value.filter((reviewer) =>
    `${reviewer.fName} ${reviewer.lName}`
      .toLowerCase()
      .includes(searchQueryReviewer.value.toLowerCase())
  )
);

// Function to handle reviewer selection
const selectReviewer = (reviewer) => {
  // Handle reviewer selection logic here
  selectedReviewer.value = reviewer;
};

const filteredResumes = computed(() => 
    resumes.value.filter((resume) => 
        `${resume.name}`
            .toLowerCase()
            .includes(searchQueryResume.value.toLowerCase())
    )
);

const selectResume = (resume) => {
    selectedResume.value = resume;
}

const toggleRequest = () => {
    emit("toggleRequest");
}

const getReviewers = () => {
    userServices.getAllUsers()
        .then((res) => {
            reviewers.value = res.data.filter(user => user.reviewerId != null);
        })
        .catch((error) => {
            console.log(error)
        });
}

const getResumes = () => {
    resumeServices.getAllResumes(studentId.value)
        .then((res) => {
            resumes.value = res.data;
        })
        .catch((error) => {
            console.log(error);
        })
}

// Submit the request
const submitReview = () => {
    if (selectedReviewer.value === null && selectedResume.value === null) {
        error.value = "No Reviewer or Resume was selected";
    }
    else if (selectedResume.value === null) {
        error.value = "No Resume was selected";
    }
    else if (selectedReviewer.value === null) {
        error.value = "No Reviewer was selected";
    }
    else {
        // Create resumeReview
        resumeReviewServices.createResumeReview(studentId.value, {suggesstion: "", notes: reviewNotes.value})
            .then((res) => {
                console.log("Resume Review Created");
                console.log(res.data);
                resumeReviewId.value = res.data.id;
                // Assign Review
                assignReview();
                // Create a userResumeReview
                createUserResumeReview();
            })
            .catch((err) => {
                console.log(err);
            });
    
        emit("toggleRequest");
    }
}

// Assign the created resumeReview to the chosen Resume
const assignReview = () => {
    selectedResume.value.resumeReviewId = resumeReviewId.value;
    console.log(selectedResume.value);

    resumeServices.updateResume(studentId.value, selectedResume.value.id, selectedResume.value)
        .then((res) => {
            console.log("Review Assigned to Resume");
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
}

// Create a userResumeReview with the chosen Reviewer(user table) and the resumeReview created earlier
const createUserResumeReview = () => {
    userResumeReviewServices.createUserResumeReview(user.userId, resumeReviewId.value, {})
        .then((res) => {
            console.log("Created userResumeReview")
        })
        .catch((err) => {
            console.log(err);
        });
}
</script>

<style scoped>
.dropdown{
    width: 100%;
    height: 100%;
    cursor: pointer;
    display: flex;
    border: 5px;
    z-index: 100;
}

.list-item{
    background: white;
    color: black;
    font: 100;
    cursor: pointer;
}

.dropdown-button {
    width: 100%;
    height: 100%;
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    text-align: left; 
    color: black;
    padding: 0 10px; 
    box-sizing: border-box; 
}

.shortcuts {
    display: flex;
    justify-content: flex-end; /* Space between dropdown and buttons */
    gap: 30px;
    align-items: right; /* Center vertically */
    margin-bottom: 20px; /* Space below the shortcuts */
    margin-top: 10px;
}

.submit-button {
    padding-top: 10px;
    padding-bottom: 10px;
    background: green;
    color: white;
    text-align: center;
    font: bold;
    border-radius: 8px;
    cursor: pointer;
}

.dropdown-arrow {
  text-align: right;
  transition: transform 0.3s ease;
  z-index: 1000;
}

.arrow-up {
  transform: rotate(180deg);
  z-index: 1000;
}

.arrow-down {
  transform: rotate(0deg);
  z-index: 1000;
}

.text-notes{
    border-radius: 4px;
    border: 1px solid gray;
    width: 100%;
    height: 100px;
    padding: 5px;
    margin-bottom: 15px;
    text-align: left; 
    vertical-align: top; 
    resize: none; 
    box-sizing: border-box;
}
</style>