import apiClient from "./services.js";

export default {
    createRole(data) {
      return apiClient.post(`role/`, data);
    },
    getAllRoles() {
      return apiClient.get(`role/`);
    },
    getRole(id) {
      return apiClient.get(`role/${id}`);
    },
    updateRole(id, data) {
      return apiClient.put(`role/${id}`, data);
    },
    deleteRole(id) {
      return apiClient.delete(`role/${id}`);
    },
    deleteAllRoles() {
      return apiClient.delete(`role/`);
    },
};