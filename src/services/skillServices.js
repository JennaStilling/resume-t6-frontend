import apiClient from "./services.js";

export default {
    createSkill(studentId, data) {
      return apiClient.post(`student/${studentId}/skill/`, data);
    },
    getAllSkills(studentId) {
      return apiClient.get(`student/${studentId}/skill/`);
    },
    getSkill(studentId, id) {
      return apiClient.get(`student/${studentId}/skill/${id}`);
    },
    updateSkill(studentId, id, data) {
      return apiClient.put(`student/${studentId}/skill/${id}`, data);
    },
    deleteSkill(studentId, id) {
      return apiClient.delete(`student/${studentId}/skill/${id}`);
    },
    deleteAllSkills(studentId) {
      return apiClient.delete(`student/${studentId}/skill/`);
    },
};