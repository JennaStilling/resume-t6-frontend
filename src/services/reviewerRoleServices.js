import apiClient from "./services.js";

export default {
    createStudent(data) {
      return apiClient.post(`reviewerRole/`, data);
    },
    getAllStudents() {
      return apiClient.get(`reviewerRole/`);
    },
    getStudent(id) {
      return apiClient.get(`reviewerRole/${id}`);
    },
    updateStudent(id, data) {
      return apiClient.put(`reviewerRole/${id}`, data);
    },
    deleteStudent(id) {
      return apiClient.delete(`reviewerRole/${id}`);
    },
    deleteAllStudents() {
      return apiClient.delete(`reviewerRole/`);
    },
};