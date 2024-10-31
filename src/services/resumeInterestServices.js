import apiClient from "./services.js";

export default {
    createResumeInterest(resumeId, interestId, data) {
      return apiClient.post(`resume/${resumeId}/interest/${interestId}/resumeInterest/`, data);
    },
    getAllResumeInterests(resumeId, interestId) {
      return apiClient.get(`resume/${resumeId}/interest/${interestId}/resumeInterest/`);
    },
    getResumeInterest(resumeId, interestId, id) {
      return apiClient.get(`resume/${resumeId}/interest/${interestId}/resumeInterest/${id}`);
    },
    updateResumeInterest(resumeId, interestId, id, data) {
      return apiClient.put(`resume/${resumeId}/interest/${interestId}/resumeInterest/${id}`, data);
    },
    deleteResumeInterest(resumeId, interestId, id) {
      return apiClient.delete(`resume/${resumeId}/interest/${interestId}/resumeInterest/${id}`);
    },
    deleteAllResumeInterests(resumeId, interestId) {
      return apiClient.delete(`resume/${resumeId}/interest/${interestId}/resumeInterest/`);
    },
};