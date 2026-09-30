import apiClient from './axiosInstance';

export const api = {
  async getTasks(params = {}) {
    const res = await apiClient.get('/tasks', { params });
    return res.data;
  },

  async searchTasks(query) {
    const res = await apiClient.get('/tasks/search', { params: { q: query } });
    return res.data;
  },

  async createTask(taskData) {

    const res = await apiClient.post('/tasks', taskData);
    return res.data;
  },

  async updateTask(id, updates) {
    const res = await apiClient.put(`/tasks/${id}`, updates);
    return res.data;
  },

  async deleteTask(id) {
    const res = await apiClient.delete(`/tasks/${id}`);
    return res.data;
  },

  async getWeeklySummary() {
    const res = await apiClient.get('/weeks/summary');
    return res.data;
  },

  async checkHealth() {
    const res = await apiClient.get('/health');
    return res.data;
  }
};
