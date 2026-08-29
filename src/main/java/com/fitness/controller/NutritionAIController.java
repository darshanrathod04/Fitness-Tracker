package com.fitness.controller;

import com.fitness.dto.request.NutritionPlanRequest;
import com.fitness.dto.response.NutritionPlanResponse;
import com.fitness.service.NutritionAIService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai/nutrition")
public class NutritionAIController {

    private final NutritionAIService nutritionAIService;

    public NutritionAIController(NutritionAIService nutritionAIService) {
        this.nutritionAIService = nutritionAIService;
    }

    @PostMapping
    public NutritionPlanResponse generate(
            @Valid @RequestBody NutritionPlanRequest request
    ) {
        return nutritionAIService.generatePlan(request);
    }
}