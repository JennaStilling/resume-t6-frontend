<template>
  <div class="inbox-container">
    <h1>Review Resumes Inbox</h1>
    <ul class="review-list">
      <li 
        v-for="review in paginatedReviews" 
        :key="review.id"
        @click="navigateToReviewResume(review.id)"
        class="review-item"
      >
        <div class="review-header">
          <span class="student-name">{{ review.studentfName }} {{ review.studentlName }}</span>
          <span class="request-date">{{ formatDate(review.requestDate) }}</span>
        </div>
        <div class="review-body">
          Request: {{ review.notes }}
        </div>
      </li>
    </ul>
    
    <div class="pagination">
      <button 
        :disabled="currentPage === 1" 
        @click="changePage(currentPage - 1)"
      >
        Previous
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button 
        :disabled="currentPage === totalPages" 
        @click="changePage(currentPage + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
import userResumeReviewServices from "@/services/userResumeReviewServices.js";
import resumeReviewServices from "@/services/resumeReviewServices";
import userServices from "@/services/userServices.js";
import { ref, onMounted, computed } from "vue";
import Utils from "../../config/utils.js";

export default {
  data() {
    return {
      userResumeReviews: [],
      resumeReviews: [],
      currentPage: 1,
      itemsPerPage: 10, // CHANGE THIS TO 1 FOR TESTING BUTTONS
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.resumeReviews.length / this.itemsPerPage);
    },
    paginatedReviews() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.resumeReviews.slice(start, end);
    },
  },
  methods: {
    async fetchUserResumeReviews() {
      try {
        const user = Utils.getStore("user");
        const userId = user.userId;
        const response = await userResumeReviewServices.getAllUserResumeReviewsByUserId(userId);
        this.userResumeReviews = response.data;

        const reviewPromises = this.userResumeReviews.map(async (review) => {
          const reviewDetails = await resumeReviewServices.getResumeReviewById(review.resumeReviewId);
          const studentDetails = await userServices.getStudentUser(reviewDetails.data.studentId, userId);

          if (reviewDetails.data.status === "created") {
            this.resumeReviews.push({
              id: reviewDetails.data.id,
              notes: reviewDetails.data.notes,
              studentfName: studentDetails.data.fName,
              studentlName: studentDetails.data.lName,
              requestDate: reviewDetails.data.createdAt, // Assuming createdAt is the request date
            });
          }
        });

        await Promise.all(reviewPromises);
      } catch (error) {
        console.error("Error fetching user resume reviews:", error);
      }
    },
    changePage(newPage) {
      if (newPage > 0 && newPage <= this.totalPages) {
        this.currentPage = newPage;
      }
    },
    navigateToReviewResume(reviewId) {
      this.$router.push({ name: "reviewResume", params: { id: reviewId } });
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
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
  border-radius: 20px;
  max-width: 80%;
  margin: 0 auto;
  margin-top: 50px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #0c0c0c;
  text-align: center;
  margin-bottom: 20px;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
}

.review-list {
  list-style-type: none;
  padding: 0;
}

.review-item {
  cursor: pointer;
  padding: 15px;
  margin: 10px 0;
  background-color: #FFF;
  border-radius: 8px;
  transition: background-color 0.3s, transform 0.2s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.review-item:hover {
  background-color: #F0F8FF;
  transform: translateY(-2px);
}

.review-header {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-bottom: 5px;
}

.student-name, .request-date {
  color: #2C3E50;
}

.review-body {
  color: #34495E;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 19px;
}

button {
  background-color: #0f769e;
  color: #FFF;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:disabled {
  background-color: #96acb7;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #0581b1;
}

span {
  font-weight: bold;
}
</style>