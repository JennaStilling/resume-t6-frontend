import apiClient from "./services.js";

export default {
    createResume(studentId, data) {
      return apiClient.post(`student/${studentId}/resume/`, data);
    },
    getAllResumes(studentId) {
      return apiClient.get(`student/${studentId}/resume/`);
    },
    getResume(studentId, id) {
      return apiClient.get(`student/${studentId}/resume/${id}`);
    },
    updateResume(studentId, id, data) {
      return apiClient.put(`student/${studentId}/resume/${id}`, data);
    },
    deleteResume(studentId, id) {
      return apiClient.delete(`student/${studentId}/resume/${id}`);
    },
    deleteAllResumes(studentId) {
      return apiClient.delete(`student/${studentId}/resume/`);
    },
    // Gets the resume to be reviewed using resumeReview id
    getResumeForReview(resumeReviewId, id) {
      return apiClient.get(`resumeReview/${resumeReviewId}/resume/${id}`);
    },
};