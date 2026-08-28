package com.fitness.dto.request;
import jakarta.validation.constraints.NotBlank;

public record AIChatRequest(

        @NotBlank
        String message
) {}