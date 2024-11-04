import apiClient from "./services.js";

export default {
    createStudent(data) {
      return apiClient.post(`student/`, data);
    },
    getAllStudents() {
      return apiClient.get(`student/`);
    },
    getStudent(id) {
      return apiClient.get(`student/${id}`);
    },
    updateStudent(id, data) {
      return apiClient.put(`student/${id}`, data);
    },
    deleteStudent(id) {
      return apiClient.delete(`student/${id}`);
    },
    deleteAllStudents() {
      return apiClient.delete(`student/`);
    },
};