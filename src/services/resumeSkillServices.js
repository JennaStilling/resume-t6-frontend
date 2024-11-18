import apiClient from "./services.js";

export default {
    createResumeSkill(resumeId, skillId, data) {
      return apiClient.post(`resume/${resumeId}/skill/${skillId}/resumeSkill/`, data);
    },
    getAllResumeSkills(resumeId) {
      return apiClient.get(`resume/${resumeId}/resumeSkill/`);
    },
    getResumeSkill(resumeId, skillId, id) {
      return apiClient.get(`resume/${resumeId}/skill/${skillId}/resumeSkill/${id}`);
    },
    updateResumeSkill(resumeId, skillId, id, data) {
      return apiClient.put(`resume/${resumeId}/skill/${skillId}/resumeSkill/${id}`, data);
    },
    deleteResumeSkill(resumeId, skillId, id) {
      return apiClient.delete(`resume/${resumeId}/skill/${skillId}/resumeSkill/${id}`);
    },
    deleteAllResumeSkills(resumeId) {
      return apiClient.delete(`resume/${resumeId}/resumeSkill/`);
    },
};