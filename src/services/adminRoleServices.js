import apiClient from "./services.js";

export default {
    createStudent(data) {
      return apiClient.post(`adminRole/`, data);
    },
    getAllStudents() {
      return apiClient.get(`adminRole/`);
    },
    getStudent(id) {
      return apiClient.get(`adminRole/${id}`);
    },
    updateStudent(id, data) {
      return apiClient.put(`adminRole/${id}`, data);
    },
    deleteStudent(id) {
      return apiClient.delete(`adminRole/${id}`);
    },
    deleteAllStudents() {
      return apiClient.delete(`adminRole/`);
    },
};