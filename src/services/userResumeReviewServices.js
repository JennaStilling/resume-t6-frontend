import apiClient from "./services.js";

export default {
    createUserResumeReview(userId, resumeReviewId, data) {
      return apiClient.post(`user/${userId}/resumeReview/${resumeReviewId}/userResumeReview/`, data);
    },
    getAllUserResumeReviews(userId, resumeReviewId) {
      return apiClient.get(`user/${userId}/resumeReview/${resumeReviewId}/userResumeReview/`);
    },
    getUserResumeReview(userId, resumeReviewId, id) {
      return apiClient.get(`user/${userId}/resumeReview/${resumeReviewId}/userResumeReview/${id}`);
    },
    updateUserResumeReview(userId, resumeReviewId, id, data) {
      return apiClient.put(`user/${userId}/resumeReview/${resumeReviewId}/userResumeReview/${id}`, data);
    },
    deleteUserResumeReview(userId, resumeReviewId, id) {
      return apiClient.delete(`user/${userId}/resumeReview/${resumeReviewId}/userResumeReview/${id}`);
    },
    deleteAllUserResumeReviews(userId, resumeReviewId) {
      return apiClient.delete(`user/${userId}/resumeReview/${resumeReviewId}/userResumeReview/`);
    },
};