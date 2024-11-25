import apiClient from "./services.js";

export default {
    createResumeReview(studentId, data) {
        return apiClient.post(`student/${studentId}/resumeReview/`, data);
    },
    getAllResumeReviews(studentId) {
        return apiClient.get(`student/${studentId}/resumeReview/`);
    },
    getResumeReview(studentId, id) {
        return apiClient.get(`student/${studentId}/resumeReview/${id}`);
    },
    getResumeReviewById(id) {
        return apiClient.get(`resumeReview/${id}`);
    },
    updateResumeReview(studentId, id, data) {
        return apiClient.put(`student/${studentId}/resumeReview/${id}`, data);
    },
    deleteResumeReview(studentId, id) {
        return apiClient.delete(`student/${studentId}/resumeReview/${id}`);
    },
    deleteAllResumeReviews(studentId) {
        return apiClient.delete(`student/${studentId}/resumeReview/`);
    }
};