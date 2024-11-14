import apiClient from "./services.js";

export default {
    createCourse(studentId, educationId, data) {
      return apiClient.post(`student/${studentId}/education/${educationId}/course/`, data);
    },
    getAllCourses(studentId, educationId) {
      return apiClient.get(`student/${studentId}/education/${educationId}/course/`);
    },
    getCourse(studentId, educationId, id) {
      return apiClient.get(`student/${studentId}/education/${educationId}/course/${id}`);
    },
    updateCourse(studentId, educationId, id, data) {
      return apiClient.put(`student/${studentId}/education/${educationId}/course/${id}`, data);
    },
    deleteCourse(studentId, educationId, id) {
      return apiClient.delete(`student/${studentId}/education/${educationId}/course/${id}`);
    },
    deleteAllCourses(studentId, educationId) {
      return apiClient.delete(`student/${studentId}/education/${educationId}/course/`);
    },
};