import API from './api';

export type GoalType =
  | 'DAILY_CALORIES'
  | 'DAILY_STEPS'
  | 'DAILY_ACTIVE_MINUTES'
  | 'WATER'
  | 'WEIGHT_TARGET';

export type GoalStatus = 'ACTIVE' | 'COMPLETED' | 'ARCHIVED';

export interface GoalRequest {
  title: string;
  type: GoalType;
  targetValue: number;
  unit?: string;
  startDate?: string;
  endDate?: string;
}

export interface Goal {
  id: number;
  title: string;
  type: GoalType;
  targetValue: number;
  currentValue: number;
  unit: string;
  status: GoalStatus;
  startDate: string;
  endDate: string;
  progress: number;
  completed: boolean;
}

export const getGoals = async (): Promise<Goal[]> => {
  const res = await API.get('/goals');
  return res.data;
};

export const createGoal = async (body: GoalRequest) => {
  const res = await API.post('/goals', body);
  return res.data as Goal;
};

export const updateGoal = async (id: number, body: GoalRequest) => {
  const res = await API.put(`/goals/${id}`, body);
  return res.data as Goal;
};

export const updateGoalStatus = async (
  id: number,
  status: GoalStatus,
) => {
  const res = await API.patch(`/goals/${id}/status`, null, {
    params: { status },
  });
  return res.data as Goal;
};

export const deleteGoal = async (id: number) => {
  const res = await API.delete(`/goals/${id}`);
  return res.data;
};