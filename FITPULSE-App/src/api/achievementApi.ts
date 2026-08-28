import API from './api';

export interface Achievement {
  code: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  progress: number;
  earnedAt: string | null;
}

export const getAchievements = async (
  check = true,
): Promise<Achievement[]> => {
  const res = await API.get('/achievements', { params: { check } });
  return res.data;
};

export const getEarnedAchievements = async (): Promise<Achievement[]> => {
  const res = await API.get('/achievements/earned');
  return res.data;
};