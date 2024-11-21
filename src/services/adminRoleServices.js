import apiClient from "./services.js";

export default {
    createAdmin(data) {
      return apiClient.post(`adminRole/`, data);
    },
    getAllAdmins() {
      return apiClient.get(`adminRole/`);
    },
    getAdmin(id) {
      return apiClient.get(`adminRole/${id}`);
    },
    updateAdmin(id, data) {
      return apiClient.put(`adminRole/${id}`, data);
    },
    deleteAdmin(id) {
      return apiClient.delete(`adminRole/${id}`);
    },
    deleteAlLAdmins() {
      return apiClient.delete(`adminRole/`);
    },
};