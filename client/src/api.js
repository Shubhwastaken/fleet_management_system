import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Aircraft API
export const aircraftAPI = {
  getAll: () => api.get('/aircraft'),
  getById: (id) => api.get(`/aircraft/${id}`),
  create: (data) => api.post('/aircraft', data),
  update: (id, data) => api.put(`/aircraft/${id}`, data),
  delete: (id) => api.delete(`/aircraft/${id}`),
  getStats: () => api.get('/aircraft/stats/overview'),
};

// Flights API
export const flightsAPI = {
  getAll: () => api.get('/flights'),
  getById: (id) => api.get(`/flights/${id}`),
  create: (data) => api.post('/flights', data),
  update: (id, data) => api.put(`/flights/${id}`, data),
  delete: (id) => api.delete(`/flights/${id}`),
};

// Maintenance API
export const maintenanceAPI = {
  getAll: () => api.get('/maintenance'),
  getById: (id) => api.get(`/maintenance/${id}`),
  getByAircraft: (aircraftId) => api.get(`/maintenance/aircraft/${aircraftId}`),
  create: (data) => api.post('/maintenance', data),
  update: (id, data) => api.put(`/maintenance/${id}`, data),
  delete: (id) => api.delete(`/maintenance/${id}`),
};

// Tracking API
export const trackingAPI = {
  getAll: () => api.get('/tracking'),
  getByAircraft: (aircraftId) => api.get(`/tracking/aircraft/${aircraftId}`),
  create: (data) => api.post('/tracking', data),
};

// Airports API
export const airportsAPI = {
  getAll: () => api.get('/airports'),
  getById: (id) => api.get(`/airports/${id}`),
};

// Technicians API
export const techniciansAPI = {
  getAll: () => api.get('/technicians'),
  getById: (id) => api.get(`/technicians/${id}`),
};

// TCL (Transaction Control Language) API
export const tclAPI = {
  executeTransaction: (operations) => api.post('/tcl/transaction', { operations }),
  demoRollback: () => api.post('/tcl/demo-rollback'),
  demoSavepoint: () => api.post('/tcl/demo-savepoint'),
  maintenanceTransaction: (data) => api.post('/tcl/maintenance-transaction', data),
  getIsolationLevel: () => api.get('/tcl/isolation-level'),
  setIsolationLevel: (level) => api.post('/tcl/isolation-level', { level }),
};

// DCL (Data Control Language) API
export const dclAPI = {
  createUser: (data) => api.post('/dcl/create-user', data),
  grantPrivileges: (data) => api.post('/dcl/grant', data),
  revokePrivileges: (data) => api.post('/dcl/revoke', data),
  showGrants: (username, host) => api.get(`/dcl/show-grants/${username}?host=${host || 'localhost'}`),
  dropUser: (username, host) => api.delete(`/dcl/drop-user/${username}?host=${host || 'localhost'}`),
  demoCreateAircraftManager: () => api.post('/dcl/demo-create-aircraft-manager'),
  demoCreateReadonlyUser: () => api.post('/dcl/demo-create-readonly-user'),
  demoCreateTechnicianUser: () => api.post('/dcl/demo-create-technician-user'),
  listUsers: () => api.get('/dcl/users'),
};

export default api;
