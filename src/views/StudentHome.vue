  <template>
    <div class="container">
        <!-- Side Navigation Bar -->
        <StudentHomeSideNav/>

        <!-- Main Content Area -->
        <div class="content">
            <div class="filtering-shortcuts">
                <Dropdown style="border-color: #53011a;">
                    <template #trigger>
                        <button type="button">SELECT</button>
                    </template>
                    <ul style="background-color: #65001F; color: white;">
                      <li
                        v-for="filter in filterOptions" 
                        :key="filter" 
                        @click="() => selectFilter(filter)"
                        :class="{ 'is-selected': selectedFilter === filter }">
                        {{ filter }}
                      </li>
                    </ul>
                </Dropdown>

                <div class="display-toggle">
                    <img src="/src/assets/grid-icon.svg" alt="Grid Layout" style="display: block; margin: auto;" 
                      @click="setDisplay('grid')" :class="{ active: displayType === 'grid', 'cursor-pointer': isActive }"/>
                    <img src="/src/assets/list-elements/list-icon.svg" alt="List Layout" style="display: block; margin: auto;" 
                      @click="setDisplay('list')" :class="{ active: displayType === 'list', 'cursor-pointer': isActive }"/>
                </div>
            </div>
  
            
            <div class="resume-create-shortcut-area">
              <br><br><br><br>
                <img src="/src/assets/add-icon.png" alt="Start Resume" 
                  :class="{ 'cursor-pointer': isActive }" style="display: block; margin: auto;" @click="createResume"/>
            </div>

            <div class="resume-previews">
              <ResumePreview
              v-for="resume in resumes"
              :key="resume.id"
              :resume="resume"
              @edit="handleEdit"
              @delete="handleDelete"
              />
            </div>
        </div>
    </div>
  </template>
  
  <script setup>
  import Dropdown from 'v-dropdown';
  import { ref, onMounted } from "vue";
  import { useRouter } from 'vue-router';
  import Utils from '@/config/utils.js';
  import resumeServices from '../services/resumeServices.js'
  import StudentHomeSideNav from '@/components/StudentHomeSideNav.vue';
  import ResumePreview from '@/components/ResumePreview.vue';
  
  const user = Utils.getStore("user");
  const studentId = ref();
  const resumes = ref([]);
  const displayType = ref('list'); // Default display type
  const router = useRouter();
  const filterOptions = ['Name', 'Last Modified', 'Created']; // Filter options
  const selectedFilter = ref(filterOptions[0]);
  const isActive = ref(true);
  
  const getResumes = () => {
    resumeServices.getAllResumes(studentId.value)
        .then((response) => {
          resumes.value = response.data;
        })
        .catch((error) => {
          console.log("Could not retrieve resumes: " + error);
        })
  };
  
  const createResume = () => {
    router.push({ name: 'addResume' }); // Navigate to the resume creation page
  };
  
  const setDisplay = (type) => {
    displayType.value = type;
    // Add logic to update the display based on the type
  };
  
  const selectFilter = (option) => {
    selectedFilter.value = option; // Update label with selected option
    console.log(`Selected filter: ${option}`)
  };
  
  onMounted(() => {
    Utils.getUser(user).then(value => {
      studentId.value = value.studentId;
      getResumes();
    });
  });

  const handleEdit = (id) => {
    router.push({ name: 'editResume', params: { id } });
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/resumes/${id}`, { method: 'DELETE' });
      // Remove the deleted resume from the list
      const index = resumes.value.findIndex(resume => resume.id === id);
      if (index !== -1) {
        resumes.value.splice(index, 1);
      }
    } catch (error) {
    console.error('Error deleting resume:', error);
    }
  };
  </script>
  
  <style scoped>
  .container {
    display: flex; /* Use flexbox for layout */
  }
  
  .content {
    padding-left: 40px; /* Padding for the content area */
    flex-grow: 1; /* Take up remaining space */
  }
  
  .filtering-shortcuts {
    display: flex;
    justify-content: flex-end; /* Space between dropdown and buttons */
    gap: 30px;
    align-items: right; /* Center vertically */
    margin-bottom: 20px; /* Space below the shortcuts */
    margin-top: 10px;
  }
  
  .display-toggle {
    margin-right: 30px; /* Space between buttons */
    display: flex;
    gap: 30px; /* Space between icons */
  }

  .icon-row {
    width: 24px; /* Adjust as needed */
    height: 24px; /* Adjust as needed */
    cursor: pointer;
  }

  .icon-row.active {
    stroke: #007bff; /* Change stroke color when active */
  }

  .filtering-shortcuts .active {
    background-color: #1A9BCB; /* Highlight active button */
    color: white; /* Text color for active button */
  }
  
  .resume-create-shortcut-area {
    width: 222px; /* Set width to resemble a piece of paper */
    height: 298px; /* Set height */
    border: 2px dashed #1A9BCB; /* Dashed border */
    padding: 10px; /* Padding inside the box */
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow */
    margin-bottom: 20px; /* Space below the shortcut area */
    border-radius: 20px;
    cursor: pointer;
  }
  
  .create-resume-button {
    background-color: #1A9BCB; /* Button color */
    color: white; /* Text color */
    border: none; /* No border */
    padding: 10px 20px; /* Padding */
    border-radius: 5px; /* Rounded corners */
    cursor: pointer; /* Pointer cursor */
    font-size: 16px; /* Font size */
  }
  
  .create-resume-button:hover {
    background-color: #118ACB; /* Darker color on hover */
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .resume-previews {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    grid-auto-flow: dense;
    grid-row-gap: 10px; /* Adjust as needed */
  }
  </style>