import apiClient from "./services.js";

export default {
    createInterest(studentId, data) {
      return apiClient.post(`student/${studentId}/interest/`, data);
    },
    getAllInterests(studentId) {
      return apiClient.get(`student/${studentId}/interest/`);
    },
    getInterest(studentId, id) {
      return apiClient.get(`student/${studentId}/interest/${id}`);
    },
    updateInterest(studentId, id, data) {
      return apiClient.put(`student/${studentId}/interest/${id}`, data);
    },
    deleteInterest(studentId, id) {
      return apiClient.delete(`student/${studentId}/interest/${id}`);
    },
    deleteAllInterests(studentId) {
      return apiClient.delete(`student/${studentId}/interest/`);
    },
};