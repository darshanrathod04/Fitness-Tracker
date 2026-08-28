import { create } from 'zustand';

import { getDashboard } from '../api/dashboard';

interface DashboardState {
  calories: number;
  steps: number;
  activeHours: number;
  distance: number;

  load: () => Promise<void>;
}

export const useDashboard = create<DashboardState>((set) => ({
  calories: 0,
  steps: 0,
  activeHours: 0,
  distance: 0,

  load: async () => {
    const data = await getDashboard();

    set({
      calories: data.calories,
      steps: data.steps,
      activeHours: data.activeHours,
      distance: data.distance,
    });
  },
}));