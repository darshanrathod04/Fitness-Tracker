package com.fitness.dto.response;

import java.util.List;

public record WorkoutPlanResponse(

        String title,

        String executiveSummary,

        String goal,

        String feasibility,

        String priority,

        List<String> workouts,

        List<String> recommendations,

        double confidence
) {}