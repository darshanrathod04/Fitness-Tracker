import API from './api';

export interface DashboardData {
  calories: number;
  steps: number;
  activeHours: number;
  distance: number;
}

/**
 * Today's headline dashboard metrics derived from the analytics endpoint
 * (last 7 days). The frontend previously computed these client-side from the
 * raw activity list; this keeps the store wired to a real endpoint.
 */
export const getDashboard = async (): Promise<DashboardData> => {
  const { data } = await API.get('/analytics', {
    params: { range: 'WEEK' },
  });

  const daily = data.dailySeries ?? [];
  const today = daily[daily.length - 1];

  return {
    calories: today?.calories ?? 0,
    steps: today?.steps ?? 0,
    activeHours: Math.round(((today?.minutes ?? 0) / 60) * 10) / 10,
    distance: Math.round((today?.minutes ?? 0) * 0.12 * 100) / 100,
  };
};