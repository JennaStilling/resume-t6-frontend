<template>
  <div class="container">
    <div class="sidebar">
      <div class="list">
        <!-- CERTIFICATION LIST ON LEFT SIDE -->
        <div class="list-title" @click="toggleDropdown">
          Certification List {{ showDropdown ? '▲' : '▼' }}
        </div>
        <br>
        <div v-if="showDropdown" class="dropdown">
          <ul>
            <li v-for="(item, index) in certifications" :key="index" class="dropdown-item">
              <!-- Display each certification's name -->
              <span class="certification-name name">{{ item.name }}</span>
              <div class="icon-buttons">
                <!-- Edit icon for entry -->
                <img
                  src="@/assets/list-elements/edit-list-item.png"
                  alt="Edit"
                  class="icon"
                  @click.stop="editEntry(index)"
                />
                <!-- Delete icon for entry -->
                <img
                  src="@/assets/list-elements/delete-list-item.png"
                  alt="Delete"
                  class="icon"
                  @click.stop="showDeleteConfirmation(index)"
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Main form for entering certification details -->
    <div class="main-content">
      <div class="form">
        <!-- Certification name input field -->
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

        <!-- Company input field -->
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

        <!-- Date acquired input field -->
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

        <!-- Save changes button -->
        <div class="save-button" @click="saveChanges">
          <div class="save-button-child"></div>
          <b class="save-changes">{{ buttonLabel }}</b>
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
            {{ certificationItems[currentCertificationIndex].name }}?
          </p>
          <p v-if="deleteError">
            Error deleting<br />
            {{ certificationItems[currentCertificationIndex].name }}.
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
            @click="deleteCertification()"
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
import certificationServices from "../../services/certificationServices.js";
import Utils from "../../config/utils.js";

const router = useRouter();
const route = useRoute();

const user = Utils.getStore("user");
const studentId = ref();
const certifications = ref(null);

onMounted(() => {
  Utils.getUser(user).then(value => {
    studentId.value = value.studentId;
    getCertification();
  });
});

const showDropdown = ref(true);
const formData = ref({
  certification: '',
  company: '',
  date: '',
});
const displayDelete = ref(false);
const deleteError = ref(false);
const currentCertificationIndex = ref(null);
const message = ref('');

const buttonLabel = computed(() => {
  return route.path.includes('/certification/edit/') ? 'SAVE CHANGES' : 'ADD CERTIFICATION';
});


function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
}

function editEntry(index) {
  router.push({ path: `/certification/edit/` });
}

function showDeleteConfirmation(index) {
  currentCertificationIndex.value = index;
  displayDelete.value = true;
}

function deleteCertification() {
  try {
    certificationItems.value.splice(currentCertificationIndex.value, 1);
    currentCertificationIndex.value = null;
    displayDelete.value = false;
  } catch (error) {
    deleteError.value = true;
  }
}

function saveChanges() {
  if (route.path.includes('/certification/edit/')) {
    // Implement save functionality here
  } else {
    certificationServices.createCertification(studentId.value, formData.value)
      .then(() => {
        window.location.reload();
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
}

// Navigation methods
function goBack() {
  router.push('/experience');
}

function goNext() {
  router.push('/skills');
}

const getCertification = () => {
      certificationServices.getAllCertifications(studentId.value)
        .then((res) => {
            certifications.value = res.data;
            console.log(certifications.value);
        })
        .catch((err) => {
            console.log(err);
        });
    }
</script>

<style>
@import '@/assets/dark-mode.css';
</style>