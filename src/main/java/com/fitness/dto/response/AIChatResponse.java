package com.fitness.dto.response;

public record AIChatResponse(

        String answer,
        double confidence
) {}