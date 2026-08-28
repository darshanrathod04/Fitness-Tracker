package com.fitness.dto.request;

import jakarta.validation.constraints.NotNull;

public record WorkoutGenerateRequest(

        @NotNull
        Long userId,

        int age
) {}