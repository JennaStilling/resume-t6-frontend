import apiClient from "./services.js";

export default {
    createEducation(studentId, data) {
      return apiClient.post(`student/${studentId}/education/`, data);
    },
    getAllEducations(studentId) {
      return apiClient.get(`student/${studentId}/education/`);
    },
    getEducation(studentId, id) {
      return apiClient.get(`student/${studentId}/education/${id}`);
    },
    updateEducation(studentId, id, data) {
      return apiClient.put(`student/${studentId}/education/${id}`, data);
    },
    deleteEducation(studentId, id) {
      return apiClient.delete(`student/${studentId}/education/${id}`);
    },
    deleteAllEducations(studentId) {
      return apiClient.delete(`student/${studentId}/education/`);
    },
};