package com.fitness.dto.response;

import java.util.List;

public record WeeklyReflectionResponse(

        int consistencyScore,

        String overallStatus,

        String reflection,

        List<String> strengths,

        List<String> improvements,

        double confidence
) {}