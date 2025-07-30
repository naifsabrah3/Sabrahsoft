import apiClient from './client';

export const projectsAPI = {
  // Public endpoints
  getAll: async (params = {}) => {
    const response = await apiClient.get('/projects', { params });
    return response.data;
  },

  getFeatured: async () => {
    const response = await apiClient.get('/projects/featured');
    return response.data;
  },

  getById: async (id) => {
    const response = await apiClient.get(`/projects/${id}`);
    return response.data;
  },

  // Admin endpoints
  admin: {
    getAll: async () => {
      const response = await apiClient.get('/admin/projects');
      return response.data;
    },

    create: async (projectData) => {
      const response = await apiClient.post('/admin/projects', projectData);
      return response.data;
    },

    update: async (id, projectData) => {
      const response = await apiClient.put(`/admin/projects/${id}`, projectData);
      return response.data;
    },

    delete: async (id) => {
      const response = await apiClient.delete(`/admin/projects/${id}`);
      return response.data;
    }
  }
};

export const contactAPI = {
  send: async (messageData) => {
    const response = await apiClient.post('/contact', messageData);
    return response.data;
  }
};

export const adminAPI = {
  login: async (credentials) => {
    const response = await apiClient.post('/admin/login', credentials);
    return response.data;
  },

  getContactMessages: async () => {
    const response = await apiClient.get('/admin/contact-messages');
    return response.data;
  }
};