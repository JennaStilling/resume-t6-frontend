import apiClient from "./services.js";

export default {
    createReviewer(data) {
      return apiClient.post(`reviewerRole/`, data);
    },
    getAllReviewers() {
      return apiClient.get(`reviewerRole/`);
    },
    getReviewer(id) {
      return apiClient.get(`reviewerRole/${id}`);
    },
    updateReviewer(id, data) {
      return apiClient.put(`reviewerRole/${id}`, data);
    },
    deleteReviewer(id) {
      return apiClient.delete(`reviewerRole/${id}`);
    },
    deleteAllReviewers() {
      return apiClient.delete(`reviewerRole/`);
    },
};