export interface WorkoutPlan {
  title: string;
  executiveSummary: string;
  goal: string;
  feasibility: string;
  priority: string;
  workouts: string[];
  recommendations: string[];
  confidence: number;
}

export interface RecoveryResult {
  recoveryScore: number;
  recommendation: string;
  explanation: string;
  confidence: number;
}

export interface NutritionPlan {
  title: string;
  calories: number;
  protein: number;
  meals: string[];
  advice: string;
  confidence: number;
}

export interface WeeklyReflection {
  consistencyScore: number;
  overallStatus: string;
  reflection: string;
  strengths: string[];
  improvements: string[];
  confidence: number;
}

export interface AdaptivePlan {
  strategy: string;
  reasoning: string;
  adjustments: string[];
  confidence: number;
}

export interface AIGoal {
  id: number;
  goal: string;
  experience: string;
  targetCalories: number;
  targetProtein: number;
}