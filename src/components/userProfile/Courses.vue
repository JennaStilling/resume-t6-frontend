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
            <li v-for="(item, index) in educations" :key="index" class="dropdown-item">
              <!-- Display each institution's name -->
              <span class="university-name name">{{ item.institution }}</span>
              <div class="icon-buttons">
                <img
                  src="@/assets/list-elements/edit-list-item.png"
                  alt="Edit"
                  class="icon"
                  @click.stop="editEntry(item)"
                />
                <img
                  src="@/assets/list-elements/delete-list-item.png"
                  alt="Delete"
                  class="icon"
                  @click.stop="showDeleteConfirmation(item)"
                />
              </div>
            </li>
          </ul>
        </div>
        <br />
        <div class="list-title" @click="toggleDropdownCourses">
          Courses List {{ showDropdownCourses ? '▲' : '▼' }}
        </div>
        <div v-if="showDropdownCourses" class="dropdown">
          <ul>
            <li v-for="(course, index) in courses" :key="index" class="dropdown-item">
              <span class="course-name name">{{ course.name }}</span>
              <div class="icon-buttons">
                <img
                  src="@/assets/list-elements/edit-list-item.png"
                  alt="Edit"
                  class="icon"
                  @click.stop="editCourse(course)"
                />
                <img
                  src="@/assets/list-elements/delete-list-item.png"
                  alt="Delete"
                  class="icon"
                  @click.stop="showDeleteCourseConfirmation(course)"
                />
              </div>
            </li>
            <div v-if="courses.length > 0">
              <button @click="addCourse" class="add-button-green">+</button>
            </div>
          </ul>
        </div>
      </div>
    </div>

    <!-- Main form for entering education details -->
    <div class="main-content">
      <div class="form">
        <!-- Education label -->
        <div class="text-field-with-title">
          <label class="field-label">
            {{ route.path.includes('/courses/select') ? 'SELECTED EDUCATION' : 'SELECT AN EDUCATION' }} <br>
          </label>
        </div>

        <!-- IF EDUCATION IS SELECTED SHOW THIS -->
        <div v-if="formData.degree && formData.institution">
          <div class="text-field-boring" readonly>
            {{ formData.degree && formData.institution ? `${formData.degree}, ${formData.institution}` : '' }}
            <br><br>
          </div>
          <div class="text-field-with-title">
            <label class="field-label">NAME</label>
            <input
              v-model="formData.name"
              class="text-field"
              type="text"
              placeholder="Enter course name"
            />
          </div>
          <div class="text-field-with-title">
            <label class="field-label">GRADE</label>
            <input
              v-model="formData.grade"
              class="text-field"
              type="text"
              placeholder="Enter grade you received"
            />
          </div>

          <!-- Save/Add button -->
          <div class="save-button" @click="saveChanges">
            <div class="save-button-child"></div>
            <b class="save-changes">{{ buttonLabel }}</b>
          </div>
        </div>

        <!-- ELSE IF EDUCATION IS NOT SELECTED SHOW THIS -->
        <div v-else>
          <br><br><br><br><br><br>
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
            {{ courseToDelete ? courseToDelete.name : educationToDelete.institution }}?
          </p>
          <p v-if="deleteError">
            Error deleting<br />
            {{ courseToDelete ? courseToDelete.name : educationToDelete.institution }}.
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
            @click="courseToDelete ? deleteCourse() : deleteEducation()"
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

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import educationServices from "../../services/educationServices.js";
import courseServices from "@/services/courseServices.js";
import Utils from "../../config/utils.js";

const router = useRouter();
const route = useRoute();

const user = Utils.getStore("user");
const studentId = ref();
const educations = ref(null);
const courses = ref([]);

const errors = ref({});

onMounted(() => {
  Utils.getUser(user).then(value => {
    studentId.value = value.studentId;
    getEducation();
    if (route.path.includes('/courses/select/')) {
      getCourses();
    }
  });
});

const showDropdown = ref(true);
const showDropdownCourses = ref(true);
const formData = ref({
  degree: '',
  institution: '',
  gpa: '',
  graduation_date: '',
  name: '',
  grade: ''
});

const currentEducation = ref(null);
const displayDelete = ref(false);
const deleteError = ref(false);
const educationToDelete = ref(null);
const message = ref('');

const buttonLabel = computed(() => {
  return route.path.includes('/courses/select/edit') ? 'SAVE CHANGES' : 'ADD TO LIST';
});

function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
}

function toggleDropdownCourses() {
  showDropdownCourses.value = !showDropdownCourses.value;
}

function editEntry(item) {
  router.push({ path: `/courses/select/` });
  currentEducation.value = item.id;
  formData.value.degree = item.degree;
  formData.value.institution = item.institution;
  formData.value.gpa = item.gpa;
  formData.value.graduation_date = item.graduation_date;
  getCourses();
}

function editCourse(course) {
  router.push({ path: '/courses/select/edit', query: { id: course.id } });
  formData.value.name = course.name;
  formData.value.grade = course.grade;
}

function addCourse() {
  router.push('/courses/select');
  formData.value.name = '';
  formData.value.grade = '';
}

const courseToDelete = ref(null);

function showDeleteCourseConfirmation(course) {
  courseToDelete.value = course;
  displayDelete.value = true;
}


function showDeleteConfirmation(item) {
  educationToDelete.value = item;
  displayDelete.value = true;
}

function deleteCourse() {
  if (courseToDelete.value) {
    courseServices.deleteCourse(studentId.value, currentEducation.value, courseToDelete.value.id)
      .then(() => {
        displayDelete.value = false;
        deleteError.value = false;
        getCourses(); // Refresh the courses list
      })
      .catch((error) => {
        console.log(error);
        deleteError.value = true;
      });
  }
}

function deleteEducation() {
  educationServices.deleteEducation(studentId.value, educationToDelete.value.id)
    .then(() => {
      displayDelete.value = false;
      deleteError.value = false;
      getEducation();
    })
    .catch((error) => {
      console.log(error);
      deleteError.value = true;
    });
}

function saveChanges() {
  if (route.path.includes('/courses/select/edit')) {
    // Update existing course
    const courseId = route.query.id;
    courseServices.updateCourse(studentId.value, currentEducation.value, courseId, formData.value)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    // Create new course
    courseServices.createCourse(studentId.value, currentEducation.value, formData.value)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

function getCourses() {
  if (currentEducation.value) {
    courseServices.getAllCourses(studentId.value, currentEducation.value)
      .then((res) => {
        courses.value = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

// Navigation methods
function goBack() {
  router.push('/contact-info');
}

function goNext() {
  router.push('/experience');
}

const getEducation = () => {
  educationServices.getAllEducations(studentId.value)
    .then((res) => {
      educations.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
}
</script>

<style>
@import '@/assets/dark-mode.css';
</style>
