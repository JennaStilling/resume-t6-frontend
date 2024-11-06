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
            <li v-for="(item, index) in certificationItems" :key="index" class="dropdown-item">
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
          <label for="name" class="field-label">CERTIFICATION NAME</label>
          <input
            type="text"
            id="name"
            v-model="formData.name"
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
          <label for="date_acquired" class="field-label">DATE ACQUIRED</label>
          <input
            type="date"
            id="date_acquired"
            v-model="formData.date_acquired"
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

<script>
import certificationServices from "../../services/certificationServices.js";
import Utils from "../../config/utils.js";
export default {
  data() {
    return {
      showDropdown: true,
      formData: {
        name: '',
        company: '',
        date_acquired: '',
      },
      certificationItems: [
        { name: 'Security+' },
        { name: 'Cloud+' }
      ],
      displayDelete: false,
      deleteError: false,
      currentCertificationIndex: null,
    };
  },
  computed: {
    buttonLabel() {
      return this.$route.path.includes('/certifications/edit/') ? 'SAVE CHANGES' : 'ADD CERTIFICATION';
    },
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    editEntry(index) {
      this.$router.push({ path: `/certifications/edit/` });
    },
    showDeleteConfirmation(index) {
      this.currentCertificationIndex = index;
      this.displayDelete = true;
    },
    deleteCertification() {
      try {
        this.certificationItems.splice(this.currentCertificationIndex, 1);
        this.currentCertificationIndex = null;
        this.displayDelete = false;
      } catch (error) {
        this.deleteError = true;
      }
    },
    saveChanges() {
      if(this.$route.path.includes('/certifications/edit/'))
      {
          //save
      }
      else {
        console.log(this.formData);
        certificationServices.createCertification(Utils.getUser.value.studentId, this.formData)
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
      this.$router.push('/experience');
    },
    goNext() {
      this.$router.push('/skills');
    },
  },
};
</script>

<style>
@import '@/assets/dark-mode.css';
</style>