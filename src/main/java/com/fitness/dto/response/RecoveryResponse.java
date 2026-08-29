package com.fitness.dto.response;

public record RecoveryResponse(

        int recoveryScore,

        String recommendation,

        String explanation,

        double confidence
) {}