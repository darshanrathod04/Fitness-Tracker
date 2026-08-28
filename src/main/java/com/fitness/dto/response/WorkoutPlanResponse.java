package com.fitness.dto.response;

import java.util.List;

public record WorkoutPlanResponse(

        String title,

        String summary,

        List<String> workouts,

        double confidence
) {}