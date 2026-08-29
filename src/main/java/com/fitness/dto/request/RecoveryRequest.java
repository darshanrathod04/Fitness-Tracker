package com.fitness.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record RecoveryRequest(

        @Min(1)
        @Max(12)
        int sleepHours,

        @NotBlank
        String soreness,

        @NotBlank
        String fatigue
) {}