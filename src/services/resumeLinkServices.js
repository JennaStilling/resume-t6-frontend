import apiClient from "./services.js";

export default {
    createResumeLink(resumeId, linkId, data) {
      return apiClient.post(`resume/${resumeId}/link/${linkId}/resumeLink/`, data);
    },
    getAllResumeLinks(resumeId) {
      return apiClient.get(`resume/${resumeId}/resumeLink/`);
    },
    getResumeLink(resumeId, linkId, id) {
      return apiClient.get(`resume/${resumeId}/link/${linkId}/resumeLink/${id}`);
    },
    updateResumeLink(resumeId, linkId, id, data) {
      return apiClient.put(`resume/${resumeId}/link/${linkId}/resumeLink/${id}`, data);
    },
    deleteResumeLink(resumeId, linkId, id) {
      return apiClient.delete(`resume/${resumeId}/link/${linkId}/resumeLink/${id}`);
    },
    deleteAllResumeLinks(resumeId) {
      return apiClient.delete(`resume/${resumeId}/resumeLink/`);
    },
};