package com.fitness.dto.response;

import java.util.List;

public record AdaptivePlanResponse(

        String strategy,

        String reasoning,

        List<String> adjustments,

        double confidence
) {}