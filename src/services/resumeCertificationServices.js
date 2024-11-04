import apiClient from "./services.js";

export default {
    createResumeCertification(resumeId, certificationId, data) {
      return apiClient.post(`resume/${resumeId}/certification/${certificationId}/resumeCertification/`, data);
    },
    getAllResumeCertifications(resumeId, certificationId) {
      return apiClient.get(`resume/${resumeId}/certification/${certificationId}/resumeCertification/`);
    },
    getResumeCertification(resumeId, certificationId, id) {
      return apiClient.get(`resume/${resumeId}/certification/${certificationId}/resumeCertification/${id}`);
    },
    updateResumeCertification(resumeId, certificationId, id, data) {
      return apiClient.put(`resume/${resumeId}/certification/${certificationId}/resumeCertification/${id}`, data);
    },
    deleteResumeCertification(resumeId, certificationId, id) {
      return apiClient.delete(`resume/${resumeId}/certification/${certificationId}/resumeCertification/${id}`);
    },
    deleteAllResumeCertifications(resumeId, certificationId) {
      return apiClient.delete(`resume/${resumeId}/certification/${certificationId}/resumeCertification/`);
    },
};