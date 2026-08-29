package com.fitness.dto.request;

import jakarta.validation.constraints.NotBlank;

public record AIGoalRequest(

        @NotBlank
        String goal,

        @NotBlank
        String experience,

        Integer targetCalories,

        Integer targetProtein
) {}