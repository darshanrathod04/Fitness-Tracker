import API from './api';

export const getMe = async () => {
  const res = await API.get('/users/me');
  return res.data;
};