package com.fitness.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record NutritionPlanRequest(

        @Min(1000)
        int calories,

        @Min(30)
        int protein,

        @NotBlank
        String goal
) {}