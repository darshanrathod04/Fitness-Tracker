package com.fitness.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

public record WeeklyReflectionRequest(

        @Min(0) @Max(7)
        int workoutsCompleted,

        @Min(0) @Max(7)
        int recoveryDays,

        @Min(0)
        int averageProtein,

        @Min(1) @Max(12)
        int averageSleep
) {}