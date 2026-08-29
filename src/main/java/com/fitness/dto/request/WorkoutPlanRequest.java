package com.fitness.dto.request;


import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record WorkoutPlanRequest(

        @NotBlank
        String goal,

        @NotBlank
        String experience,

        @Min(15)
        @Max(80)
        int age
) {}