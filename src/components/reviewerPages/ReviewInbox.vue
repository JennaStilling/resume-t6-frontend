<template>
  <div class="inbox-container">
    <h1>Review Resumes Inbox</h1>
    <ul class="review-list">
      <li 
        v-for="review in resumeReviews" 
        :key="review.id"
        @click="navigateToReviewResume(review.id)"
        class="review-item"
      >
        <div class="review-header">
          <span class="student-name">{{ review.studentfName }} {{ review.studentlName }}</span>
          <span class="review-id">Review ID: {{ review.id }}</span>
        </div>
        <div class="review-body">
          Request: {{ review.notes }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import userResumeReviewServices from "@/services/userResumeReviewServices.js";
import resumeReviewServices from "@/services/resumeReviewServices";
import userServices from "@/services/userServices.js"; // Import userServices
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import Utils from "../../config/utils.js";

export default {
  data() {
    return {
      userResumeReviews: [],
      resumeReviews: [], // Array to store full resume reviews
    };
  },
  methods: {
    async fetchUserResumeReviews() {
      try {
        const user = Utils.getStore("user");
        const userId = user.userId;
        console.log("Current userId: " + userId);
        const response = await userResumeReviewServices.getAllUserResumeReviewsByUserId(userId);
        this.userResumeReviews = response.data;

        // Fetch detailed reviews for each resumeReviewId
        const reviewPromises = this.userResumeReviews.map(async (review) => {
          const reviewDetails = await resumeReviewServices.getResumeReviewById(review.resumeReviewId);
          const studentDetails = await userServices.getStudentUser(reviewDetails.data.studentId, userId);
          return { 
            id: reviewDetails.data.id, 
            notes: reviewDetails.data.notes, 
            studentfName: studentDetails.data.fName,
            studentlName: studentDetails.data.lName
          };
        });

        // Wait for all promises to resolve and store the result
        this.resumeReviews = await Promise.all(reviewPromises);
      } catch (error) {
        console.error("Error fetching user resume reviews:", error);
      }
    },
    navigateToReviewResume(reviewId) {
      this.$router.push({ name: 'reviewResume', params: { id: reviewId } });
    }
  },
  created() {
    this.fetchUserResumeReviews();
  },
};
</script>

<style scoped>
.inbox-container {
  background-color: #C4D8E1;
  padding: 20px;
  border-radius: 10px;
  max-width: 800px;
  margin: 0 auto;
  margin-top: 50px;
}

h1 {
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

.review-list {
  list-style-type: none;
  padding: 0;
}

.review-item {
  cursor: pointer;
  padding: 15px;
  margin: 10px 0;
  background-color: #EDF4F7;
  border-radius: 8px;
  transition: background-color 0.3s, transform 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.review-item:hover {
  background-color: #DCE7EB;
  transform: translateY(-2px);
}

.review-header {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-bottom: 5px;
}

.student-name {
  color: #2C3E50;
}

.review-id {
  color: #7F8C8D;
}

.review-body {
  color: #34495E;
}
</style>
