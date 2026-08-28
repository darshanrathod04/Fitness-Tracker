import API from './api';

export interface WeightLogRequest {
  weightKg: number;
  note?: string;
  loggedDate?: string;
}

export interface WeightLog {
  id: number;
  weightKg: number;
  bmi: number;
  note: string;
  loggedDate: string;
}

export const addWeightLog = async (body: WeightLogRequest) => {
  const res = await API.post('/weight', body);
  return res.data as WeightLog;
};

export const getWeightHistory = async (): Promise<WeightLog[]> => {
  const res = await API.get('/weight');
  return res.data;
};

export const getLatestWeight = async () => {
  const res = await API.get('/weight/latest');
  return res.data as WeightLog;
};

export const deleteWeightLog = async (id: number) => {
  const res = await API.delete(`/weight/${id}`);
  return res.data;
};