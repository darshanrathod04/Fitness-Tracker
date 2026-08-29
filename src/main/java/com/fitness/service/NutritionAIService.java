package com.fitness.service;

import com.fitness.dto.request.NutritionPlanRequest;
import com.fitness.dto.response.NutritionPlanResponse;
import com.shreeai.os.platform.sdk.SDKResponse;
import com.shreeai.os.platform.sdk.ShreeAI;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NutritionAIService {

    private final ShreeAI shreeAI;

    public NutritionAIService(ShreeAI shreeAI) {
        this.shreeAI = shreeAI;
    }

    public NutritionPlanResponse generatePlan(NutritionPlanRequest request) {

        SDKResponse response = shreeAI.knowledge().search(
                request.goal() + " nutrition protein calories"
        );

        return new NutritionPlanResponse(
                "AI Nutrition Plan",
                request.calories(),
                request.protein(),
                List.of(
                        "Breakfast: Oats + Eggs",
                        "Lunch: Chicken + Rice",
                        "Dinner: Paneer + Vegetables"
                ),
                response.answer(),
                response.confidence()
        );
    }
}