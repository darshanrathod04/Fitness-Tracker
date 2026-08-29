import api from "./api";

import {
  WorkoutPlan,
  RecoveryResult,
  NutritionPlan,
  WeeklyReflection,
  AdaptivePlan,
  AIGoal
} from "../types/ai";

export interface SaveGoalRequest {
  goal: string;
  experience: string;
  targetCalories: number;
  targetProtein: number;
}

export interface WorkoutGenerateRequest {
  userId: number;
  age: number;
}

export interface RecoveryRequest {
  sleepHours: number;
  soreness: string;
  fatigue: string;
}

export interface NutritionRequest {
  calories: number;
  protein: number;
  goal: string;
}

export interface ReflectionRequest {
  userId: number;
  workoutsCompleted: number;
  recoveryDays: number;
  averageProtein: number;
  averageSleep: number;
}

export interface EvolutionRequest {
  userId: number;
  workoutsCompleted: number;
  energyLevel: number;
  soreness: number;
}

class AIApi {

  async saveGoal(
    userId: number,
    data: SaveGoalRequest
  ): Promise<AIGoal> {

    const res = await api.post(`/api/ai/goals/${userId}`, data);
    return res.data;
  }

  async getGoal(userId: number): Promise<AIGoal> {

    const res = await api.get(`/api/ai/goals/${userId}`);
    return res.data;
  }

  async generateWorkout(
    data: WorkoutGenerateRequest
  ): Promise<WorkoutPlan> {

    const res = await api.post(
      "/api/ai/workout/generate",
      data
    );

    return res.data;
  }

  async analyzeRecovery(
    data: RecoveryRequest
  ): Promise<RecoveryResult> {

    const res = await api.post(
      "/api/ai/recovery",
      data
    );

    return res.data;
  }

  async generateNutrition(
    data: NutritionRequest
  ): Promise<NutritionPlan> {

    const res = await api.post(
      "/api/ai/nutrition",
      data
    );

    return res.data;
  }

  async weeklyReflection(
    data: ReflectionRequest
  ): Promise<WeeklyReflection> {

    const res = await api.post(
      "/api/ai/reflection",
      data
    );

    return res.data;
  }

  async adaptiveEvolution(
    data: EvolutionRequest
  ): Promise<AdaptivePlan> {

    const res = await api.post(
      "/api/ai/evolution",
      data
    );

    return res.data;
  }

  async workoutHistory(
    userId: number
  ) {

    const res = await api.get(`/api/ai/plans/${userId}`);
    return res.data;
  }
}

export const aiApi = new AIApi();