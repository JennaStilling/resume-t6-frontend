<template>
  <div>
    <h1>Education Information</h1>

    <!-- Display user information if available -->
    <div v-if="user" class="user-info">
      <p><strong>User:</strong> {{ name }}</p>
      <v-btn depressed rounded text @click="logout">Logout</v-btn>
    </div>

    <!-- Display fetched education data -->
    <div v-if="educationData.length" class="education-list">
      <div v-for="(education, index) in educationData" :key="index" class="education-entry">
        <p><strong>Degree:</strong> {{ education.degree }}</p>
        <p><strong>Institution:</strong> {{ education.institution }}</p>
        <p><strong>GPA:</strong> {{ education.gpa }}</p>
        <p><strong>Graduation Date:</strong> {{ education.graduation_date }}</p>
        <hr />
      </div>
    </div>
    <p v-else>No education data available.</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import Utils from '../config/utils';
import AuthServices from '../services/authServices';
import { useRouter } from 'vue-router';

export default {
  name: 'AddResume',
  setup() {
    const educationData = ref([]);
    const authToken = ref('');
    const user = ref(null);
    const name = ref('');
    const router = useRouter();

    // Load user info from local storage
    user.value = Utils.getStore("user");
    if (user.value) {
      name.value = `${user.value.fName} ${user.value.lName}`;
      authToken.value = user.value.token; // Assuming token is stored with user data
    }

    // Fetch education data
    const fetchEducationData = async () => {
      if (!authToken.value) return;

      try {
        const response = await fetch('http://localhost:3026/resume-t6/student/${studentId.value}/education/', {
          headers: {
            'Authorization': `Bearer ${authToken.value}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch education data');
        }
        educationData.value = await response.json();
      } catch (error) {
        console.error('Error fetching education data:', error);
      }
    };

    // Trigger fetchEducationData on component mount
    onMounted(fetchEducationData);

    // Logout function
    const logout = () => {
      AuthServices.logoutUser(user.value)
        .then(response => {
          console.log(response);
          Utils.removeItem("user");
          router.push({ name: "login" });
        })
        .catch(error => {
          console.error("Logout error:", error);
        });
    };

    return { educationData, user, name, logout };
  }
};
</script>

<style scoped>
.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 1em;
}

.user-info p {
  margin: 0 0.5em;
  color: white;
}

.education-list {
  padding: 1em;
  border-radius: 5px;
}

.education-entry {
  margin-bottom: 1em;
  color: white;
}

img {
  border-radius: 50%;
  margin-left: 10px;
}

p, h1 {
  color: white;
}

v-btn {
  margin-left: 10px;
}
</style>