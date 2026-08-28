package com.fitness.dto.response;

import java.util.List;

public record NutritionPlanResponse(

        String title,

        int calories,

        int protein,

        List<String> meals,

        String advice,

        double confidence
) {}