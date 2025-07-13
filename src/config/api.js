// API Configuration
const isProd = import.meta.env.PROD;

const API_CONFIG = {
  baseURL: isProd ? '/api' : 'http://localhost:8080/api',
  endpoints: {
    contacts: '/contacts',
    contact: (id) => `/contacts/${id}`,
  },
  timeout: 10000,
};

export default API_CONFIG;
