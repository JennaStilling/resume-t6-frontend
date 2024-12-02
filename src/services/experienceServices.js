import apiClient from "./services.js";

export default {
    createExperience(studentId, data) {
      return apiClient.post(`student/${studentId}/experience/`, data);
    },
    getAllExperiences(studentId) {
      return apiClient.get(`student/${studentId}/experience/`);
    },
    getExperience(studentId, id) {
      return apiClient.get(`student/${studentId}/experience/${id}`);
    },
    updateExperience(studentId, id, data) {
      return apiClient.put(`student/${studentId}/experience/${id}`, data);
    },
    deleteExperience(studentId, id) {
      return apiClient.delete(`student/${studentId}/experience/${id}`);
    },
    deleteAllExperiences(studentId) {
      return apiClient.delete(`student/${studentId}/experience/`);
    },
};