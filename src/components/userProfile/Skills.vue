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
            <li v-for="(item, index) in skillsItems" :key="index" class="dropdown-item">
              <!-- Display each skill's name -->
              <span class="skill-name name">{{ item.name }}</span>
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
            {{ skillsItems[currentSkillIndex].name }}?
          </p>
          <p v-if="deleteError">
            Error deleting<br />
            {{ skillsItems[currentSkillIndex].name }}.
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

<script>
import skillServices from "../../services/skillServices.js";
import Utils from "../../config/utils.js";
export default {
  data() {
    return {
      showDropdown: true,
      formData: {
        name: '',
        description: '',
      },
      skillsItems: [
        { name: 'JavaScript', description: 'Expert' },
        { name: 'CSS', description: 'Intermediate' }
      ],
      displayDelete: false,
      deleteError: false,
      currentSkillIndex: null,
    };
  },
  computed: {
    buttonLabel() {
      return this.$route.path.includes('/skills/edit/') ? 'SAVE CHANGES' : 'ADD SKILL';
    },
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    editEntry(index) {
      this.$router.push({ path: `/skills/edit/` });
    },
    showDeleteConfirmation(index) {
      this.currentSkillIndex = index;
      this.displayDelete = true;
    },
    deleteSkill() {
      try {
        this.skillsItems.splice(this.currentSkillIndex, 1);
        this.currentSkillIndex = null;
        this.displayDelete = false;
      } catch (error) {
        this.deleteError = true;
      }
    },
    saveChanges() {
      if(this.$route.path.includes('/skills/edit/'))
      {
          //save
      }
      else {
        console.log(this.formData);
        skillServices.createSkill(Utils.getUser.value.studentId, this.formData)
          .then(() => {
            window.location.reload();
          })
          .catch((error) => {
            if (error.response != null && error.response.status == "406") {
              // for (let obj in errors.value) {
              //   errors.value[obj] = '*'
              // }
              // for (let obj of error.response.data) {
              //   if (obj.attributeName === undefined) {
              //     obj.attributeName = "idNumber";
              //   }
              //   errors.value[obj.attributeName] = obj.message;
              // }
            // } else {
              message.value = "Error: " + error.code + ":" + error.message;
              console.log(error);
            }
            else
            {
              console.log(error);
              //console.log(token);
            }
          });
      }
    },
    goBack() {
      this.$router.push('/certifications');
    },
    goNext() {
      this.$router.push('/project');
    }
  },
};
</script>

<style>
@import '@/assets/dark-mode.css';
</style>