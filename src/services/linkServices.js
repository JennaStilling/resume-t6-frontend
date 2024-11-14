import apiClient from "./services.js";

export default {
    createLink(studentId, data) {
      return apiClient.post(`student/${studentId}/link/`, data);
    },
    getAllLinks(studentId) {
      return apiClient.get(`student/${studentId}/link/`);
    },
    getLink(studentId, id) {
      return apiClient.get(`student/${studentId}/link/${id}`);
    },
    updateLink(studentId, id, data) {
      return apiClient.put(`student/${studentId}/link/${id}`, data);
    },
    deleteLink(studentId, id) {
      return apiClient.delete(`student/${studentId}/link/${id}`);
    },
    deleteAllLinks(studentId) {
      return apiClient.delete(`student/${studentId}/link/`);
    },
};