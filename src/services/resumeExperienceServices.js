import apiClient from "./services.js";

export default {
    createResumeExperience(resumeId, experienceId, data) {
      return apiClient.post(`resume/${resumeId}/experience/${experienceId}/resumeExperience/`, data);
    },
    getAllResumeExperiences(resumeId) {
      return apiClient.get(`resume/${resumeId}/resumeExperience/`);
    },
    getResumeExperience(resumeId, experienceId, id) {
      return apiClient.get(`resume/${resumeId}/experience/${experienceId}/resumeExperience/${id}`);
    },
    updateResumeExperience(resumeId, experienceId, id, data) {
      return apiClient.put(`resume/${resumeId}/experience/${experienceId}/resumeExperience/${id}`, data);
    },
    deleteResumeExperience(resumeId, experienceId, id) {
      return apiClient.delete(`resume/${resumeId}/experience/${experienceId}/resumeExperience/${id}`);
    },
    deleteAllResumeExperiences(resumeId) {
      return apiClient.delete(`resume/${resumeId}/resumeExperience/`);
    },
};