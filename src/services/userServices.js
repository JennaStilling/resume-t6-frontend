import apiClient from "./services.js";


// Instead of having 11 API requests, would it be better to add an if statement 
//  somehow that checks to see if the user that is making the request is a student or not?
export default {
    createUser(data) {
      return apiClient.post(`user/`, data);
    },
    getAllUsers() {
      return apiClient.get(`user/`);
    },
    getUser(id) {
      return apiClient.get(`user/${id}`);
    },
    updateUser(id, data) {
      return apiClient.put(`user/${id}`, data);
    },
    deleteUser(id) {
      return apiClient.delete(`user/${id}`);
    },
    deleteAllUsers() {
      return apiClient.delete(`user/`);
    },
    // Users as students
    createStudentUser(studentId, data) {
      return apiClient.post(`student/${studentId}/user`, data);
    },
    // Does this even make sense? User and student have a one-to-one relationship
    getAllStudentUsers(studentId) {
      return apiClient.get(`student/${studentId}/user`);
    },
    // This does the same thing as the one above it, why am I even keeping this
    getStudentUser(studentId, id) {
      return apiClient.get(`student/${studentId}/user/${id}`);
    },
    updateStudentUser(studentId, id, data) {
      return apiClient.put(`student/${studentId}/user/${id}`, data);
    },
    deleteStudentUser(studentId, id) {
      return apiClient.delete(`student/${studentId}/user/${id}`);
    },
  };