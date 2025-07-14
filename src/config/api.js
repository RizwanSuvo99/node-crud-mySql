const API_CONFIG = {
  baseURL: 'http://localhost:8080/api',
  endpoints: {
    contacts: '/contacts',
    contact: (id) => `/contacts/${id}`,
  },
  timeout: 10000,
};

export default API_CONFIG;
