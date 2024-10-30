import apiClient from "./services.js";

export default {
    createProject(studentId, data) {
      return apiClient.post(`student/${studentId}/project/`, data);
    },
    getAllProjects(studentId) {
      return apiClient.get(`student/${studentId}/project/`);
    },
    getProject(studentId, id) {
      return apiClient.get(`student/${studentId}/project/${id}`);
    },
    updateProject(studentId, id, data) {
      return apiClient.put(`student/${studentId}/project/${id}`, data);
    },
    deleteProject(studentId, id) {
      return apiClient.delete(`student/${studentId}/project/${id}`);
    },
    deleteAllProjects(studentId) {
      return apiClient.delete(`student/${studentId}/project/`);
    },
};