import API from './api';

export type MealType = 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK';

export interface FoodEntryRequest {
  mealType: MealType;
  name: string;
  calories: number;
  proteinG?: number;
  carbsG?: number;
  fatG?: number;
  fiberG?: number;
  loggedDate?: string; // yyyy-MM-dd
}

export interface FoodEntry {
  id: number;
  mealType: MealType;
  name: string;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  fiberG: number;
  loggedDate: string;
}

export interface DailyNutrition {
  date: string;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  totalFiber: number;
  totalWaterMl: number;
  meals: number;
  breakdown: Record<string, number>;
  foodEntries: FoodEntry[];
}

export const addFood = async (body: FoodEntryRequest) => {
  const res = await API.post('/nutrition/food', body);
  return res.data;
};

export const deleteFood = async (id: number) => {
  const res = await API.delete(`/nutrition/food/${id}`);
  return res.data;
};

export const addWater = async (amountMl: number, loggedDate?: string) => {
  const res = await API.post('/nutrition/water', {
    amountMl,
    loggedDate,
  });
  return res.data;
};

export const deleteWater = async (id: number) => {
  const res = await API.delete(`/nutrition/water/${id}`);
  return res.data;
};

export const getDailyNutrition = async (date?: string) => {
  const res = await API.get('/nutrition/daily', { params: { date } });
  return res.data as DailyNutrition;
};