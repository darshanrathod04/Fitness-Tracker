import API from './api';

export interface Streak {
  current: number;
  best: number;
}

export interface DailyPoint {
  date: string;
  minutes: number;
  calories: number;
}

export interface Analytics {
  range: 'WEEK' | 'MONTH';
  totalCalories: number;
  totalActiveMinutes: number;
  totalSteps: number;
  daysActive: number;
  streak: Streak;
  activityBreakdown: Record<string, number>;
  weightChange: { start: number; end: number; delta: number };
  dailySeries: DailyPoint[];
  weightHistory: {
    id: number;
    weightKg: number;
    bmi: number;
    note: string;
    loggedDate: string;
  }[];
}

export const getAnalytics = async (
  range: 'WEEK' | 'MONTH' = 'WEEK',
): Promise<Analytics> => {
  const res = await API.get('/analytics', { params: { range } });
  return res.data;
};