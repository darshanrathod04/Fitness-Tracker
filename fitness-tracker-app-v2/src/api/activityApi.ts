import API from './api';

export interface ActivityRequest {
  type: string;
  duration: number;
  calories: number;
  activityDate: string; // yyyy-MM-dd
}

export const getActivities = async () => {
  const res = await API.get('/activities');
  return res.data;
};

export const createActivity = async (body: ActivityRequest) => {
  const res = await API.post('/activities', body);
  return res.data;
};