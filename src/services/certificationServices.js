import apiClient from "./services.js";

export default {
    createCertification(studentId, data) {
      return apiClient.post(`student/${studentId}/certification/`, data);
    },
    getAllCertifications(studentId) {
      return apiClient.get(`student/${studentId}/certification/`);
    },
    getCertification(studentId, id) {
      return apiClient.get(`student/${studentId}/certification/${id}`);
    },
    updateCertification(studentId, id, data) {
      return apiClient.put(`student/${studentId}/certification/${id}`, data);
    },
    deleteCertification(studentId, id) {
      return apiClient.delete(`student/${studentId}/certification/${id}`);
    },
    deleteAllCertifications(studentId) {
      return apiClient.delete(`student/${studentId}/certification/`);
    },
};