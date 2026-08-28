import API from './api';

export const getAdminDashboard = async () => {
  const { data } = await API.get('/admin/dashboard');
  return data;
};