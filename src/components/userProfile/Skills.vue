<template>
  <div class="container">
    <div class="sidebar">
      <div class="list">
        <!-- SKILLS LIST ON LEFT SIDE -->
        <div class="list-title" @click="toggleDropdown">
          Skills List {{ showDropdown ? '▲' : '▼' }}
        </div>
        <br>
        <div v-if="showDropdown" class="dropdown">
          <ul>
            <li v-for="(item, index) in skills" :key="index" class="dropdown-item">
              <!-- Display each skill's name -->
              <span class="skill-name name">{{ item.name }}</span>
              <div class="icon-buttons">
                <!-- Edit icon for entry -->
                <img
                  src="@/assets/list-elements/edit-list-item.png"
                  alt="Edit"
                  class="icon"
                  @click.stop="editEntry(item)"
                />
                <!-- Delete icon for entry -->
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
      </div>
    </div>

    <!-- Main form for entering skill details -->
    <div class="main-content">
      <div class="form">
        <!-- Skill name input field -->
        <div class="text-field-with-title">
          <label for="skillName" class="field-label">SKILL NAME</label>
          <input
            type="text"
            id="skillName"
            v-model="formData.name"
            class="text-field"
            placeholder="Enter skill name"
            required
          />
          <span class="mandatory">*</span>
        </div>

        <!-- Skill description input field -->
        <div class="text-field-with-title">
          <label for="description" class="field-label">DESCRIPTION</label>
          <textarea
            id="description"
            v-model="formData.description"
            class="text-field"
            rows="4"
            placeholder="Enter a detailed description of your skill"
          ></textarea>
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
            {{ skillToDelete.name }}?
          </p>
          <p v-if="deleteError">
            Error deleting<br />
            {{ skillToDelete.name }}.
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
            @click="deleteSkill()"
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
import skillServices from "../../services/skillServices.js";
import Utils from "../../config/utils.js";

const router = useRouter();
const route = useRoute();

const user = Utils.getStore("user");
const studentId = ref();
const skills = ref(null);

const errors = ref({});

onMounted(() => {
  Utils.getUser(user).then(value => {
    studentId.value = value.studentId;
    getSkill();
  });
});

const showDropdown = ref(true);
const formData = ref({
  name: '',
  description: '',
});

const currentSkill = ref(null);
const displayDelete = ref(false);
const deleteError = ref(false);
const skillToDelete = ref(null);
const message = ref('');

const buttonLabel = computed(() => {
  return route.path.includes('/skills/edit/') ? 'SAVE CHANGES' : 'ADD TO LIST';
});


function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
}

function editEntry(item) {
  router.push({ path: `/skills/edit/` });
  currentSkill.value = item.id;
  formData.value.name = item.name;
  formData.value.description = item.description;
}

function showDeleteConfirmation(index) {
  skillToDelete.value = index;
  displayDelete.value = true;
}

function deleteSkill() {
  skillServices.deleteSkill(studentId.value, skillToDelete.value.id)
    .then(() => {
      displayDelete.value = false;
      deleteError.value = false;
      getSkill();
    })
    .catch((error) => {
      console.log(error);
      deleteError.value = true;
    });
}

function saveChanges() {
      if(route.path.includes('/skills/edit/'))
      {
        skillServices.updateSkill(studentId.value, currentSkill.value, formData.value)
          .then(() => {
             window.location.reload();
          })
          .catch((error) => {
            if (error.response != null && error.response.status == "406") {
              for(let obj in errors.value) {
                errors.value[obj] = '*'
              }
              for (let obj of error.response.data) {
                if (obj.attributeName === undefined) {
                  obj.attributeName = "idNumber";
                }
                errors.value[obj.attributeName] = obj.message;
              }
            } else {
              console.log(error);
              console.log(error);
            }
          });
          router.push('/skills');
      }
      else {
        skillServices.createSkill(studentId.value, formData.value)
          .then(() => {
            window.location.reload();
          })
          .catch((error) => {
            if (error.response != null && error.response.status == "406") {
              message.value = "Error: " + error.code + ":" + error.message;
              console.log(error);
            }
            else
            {
              console.log(error);
            }
          });
      }
    }

// Navigation methods
function goBack() {
  router.push('/certifications');
}

function goNext() {
  router.push('/project');
}

const getSkill = () => {
      skillServices.getAllSkills(studentId.value)
        .then((res) => {
            skills.value = res.data;
        })
        .catch((err) => {
            console.log(err);
        });
    }
</script>

<style>
@import '@/assets/dark-mode.css';
</style>