import apiClient from "./services.js";

export default {
    createResumeEducation(resumeId, educationId, data) {
      return apiClient.post(`resume/${resumeId}/education/${educationId}/resumeEducation/`, data);
    },
    getAllResumeEducations(resumeId) {
      return apiClient.get(`resume/${resumeId}/resumeEducation/`);
    },
    getResumeEducation(resumeId, educationId, id) {
      return apiClient.get(`resume/${resumeId}/education/${educationId}/resumeEducation/${id}`);
    },
    updateResumeEducation(resumeId, educationId, id, data) {
      return apiClient.put(`resume/${resumeId}/education/${educationId}/resumeEducation/${id}`, data);
    },
    deleteResumeEducation(resumeId, educationId, id) {
      return apiClient.delete(`resume/${resumeId}/education/${educationId}/resumeEducation/${id}`);
    },
    deleteAllResumeEducations(resumeId) {
      return apiClient.delete(`resume/${resumeId}/resumeEducation/`);
    },
};