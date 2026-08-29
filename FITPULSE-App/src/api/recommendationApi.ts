import API from './api';

export const getRecommendations = async () => {
  const { data } = await API.get('/recommendations');
  return data;
};

export const getActivityRecommendation = async (
  type: string,
) => {
  const { data } = await API.get(
    `/recommendations/activity/${type}`,
  );

  return data;
};