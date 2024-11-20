<template>
  <div>
    <h1>Review Inbox</h1>
    <ul>
      <li v-for="review in resumeReviews" :key="review.id">
        Resume Review ID: {{ review.id }} - {{ review.details }}
      </li>
    </ul>
  </div>
</template>


<script>
import userResumeReviewServices from "@/services/userResumeReviewServices.js";
import resumeReviewServices from "@/services/resumeReviewServices";

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
        const userId = 9;
        const response = await userResumeReviewServices.getAllUserResumeReviewsByUserId(userId);
        this.userResumeReviews = response.data;

        // Fetch detailed reviews for each resumeReviewId
        const reviewPromises = this.userResumeReviews.map(async (review) => {
          const reviewDetails = await resumeReviewServices.getResumeReviewById(review.resumeReviewId);
          return { id: review.resumeReviewId, details: reviewDetails.data };
        });

        // Wait for all promises to resolve and store the result
        this.resumeReviews = await Promise.all(reviewPromises);
      } catch (error) {
        console.error("Error fetching user resume reviews:", error);
      }
    },
  },
  created() {
    this.fetchUserResumeReviews();
  },
};
</script>

<style>
h1, ul{
  color: white;
}
</style>