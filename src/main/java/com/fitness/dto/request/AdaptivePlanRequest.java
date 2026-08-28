package com.fitness.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record AdaptivePlanRequest(

        @NotNull
        Long userId,

        @Min(0) @Max(7)
        int workoutsCompleted,

        @Min(1) @Max(10)
        int energyLevel,

        @Min(1) @Max(10)
        int soreness
) {}