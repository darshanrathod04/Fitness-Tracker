import { create } from "zustand";

import { aiApi } from "../api/aiApi";

import {
  WorkoutPlan,
  RecoveryResult,
  NutritionPlan,
  WeeklyReflection,
  AdaptivePlan,
  AIGoal
} from "../types/ai";

interface AIState {

  goal?: AIGoal;
  workout?: WorkoutPlan;
  recovery?: RecoveryResult;
  nutrition?: NutritionPlan;
  reflection?: WeeklyReflection;
  evolution?: AdaptivePlan;

  loading: boolean;
  error?: string;

  loadGoal(userId: number): Promise<void>;

  saveGoal(
    userId: number,
    payload: {
      goal: string;
      experience: string;
      targetCalories: number;
      targetProtein: number;
    }
  ): Promise<void>;

  generateWorkout(
    userId: number,
    age: number
  ): Promise<void>;

  analyzeRecovery(payload: {
    sleepHours: number;
    soreness: string;
    fatigue: string;
  }): Promise<void>;

  generateNutrition(payload: {
    calories: number;
    protein: number;
    goal: string;
  }): Promise<void>;

  weeklyReflection(payload: {
    userId: number;
    workoutsCompleted: number;
    recoveryDays: number;
    averageProtein: number;
    averageSleep: number;
  }): Promise<void>;

  adaptiveEvolution(payload: {
    userId: number;
    workoutsCompleted: number;
    energyLevel: number;
    soreness: number;
  }): Promise<void>;

  clearError(): void;
}

export const useAIStore = create<AIState>((set) => ({

  loading: false,

  async loadGoal(userId) {

    set({ loading: true, error: undefined });

    try {

      const goal = await aiApi.getGoal(userId);

      set({
        goal,
        loading: false
      });

    } catch (e: any) {

      set({
        error: e.message,
        loading: false
      });
    }
  },

  async saveGoal(userId, payload) {

    set({ loading: true, error: undefined });

    try {

      const goal = await aiApi.saveGoal(userId, payload);

      set({
        goal,
        loading: false
      });

    } catch (e: any) {

      set({
        error: e.message,
        loading: false
      });
    }
  },

  async generateWorkout(userId, age) {

    set({ loading: true, error: undefined });

    try {

      const workout = await aiApi.generateWorkout({
        userId,
        age
      });

      set({
        workout,
        loading: false
      });

    } catch (e: any) {

      set({
        error: e.message,
        loading: false
      });
    }
  },

  async analyzeRecovery(payload) {

    set({ loading: true, error: undefined });

    try {

      const recovery = await aiApi.analyzeRecovery(payload);

      set({
        recovery,
        loading: false
      });

    } catch (e: any) {

      set({
        error: e.message,
        loading: false
      });
    }
  },

  async generateNutrition(payload) {

    set({ loading: true, error: undefined });

    try {

      const nutrition = await aiApi.generateNutrition(payload);

      set({
        nutrition,
        loading: false
      });

    } catch (e: any) {

      set({
        error: e.message,
        loading: false
      });
    }
  },

  async weeklyReflection(payload) {

    set({ loading: true, error: undefined });

    try {

      const reflection = await aiApi.weeklyReflection(payload);

      set({
        reflection,
        loading: false
      });

    } catch (e: any) {

      set({
        error: e.message,
        loading: false
      });
    }
  },

  async adaptiveEvolution(payload) {

    set({ loading: true, error: undefined });

    try {

      const evolution = await aiApi.adaptiveEvolution(payload);

      set({
        evolution,
        loading: false
      });

    } catch (e: any) {

      set({
        error: e.message,
        loading: false
      });
    }
  },

  clearError() {
    set({ error: undefined });
  }

}));