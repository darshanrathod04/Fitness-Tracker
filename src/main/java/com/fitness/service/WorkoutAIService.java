package com.fitness.service;


import com.fitness.dto.request.WorkoutPlanRequest;
import com.fitness.dto.response.WorkoutPlanResponse;
import com.shreeai.os.platform.sdk.SDKResponse;
import com.shreeai.os.platform.sdk.ShreeAI;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkoutAIService {

    private final ShreeAI shreeAI;

    public WorkoutAIService(ShreeAI shreeAI) {
        this.shreeAI = shreeAI;
    }

    public WorkoutPlanResponse generatePlan(WorkoutPlanRequest request) {

        String objective = String.format(
                "Create a 3-day beginner Push Pull Legs workout for a %d year old with goal: %s. Experience: %s",
                request.age(),
                request.goal(),
                request.experience()
        );

        SDKResponse response = shreeAI.planning().createPlan(
                "fitpulse-plan",
                objective,
                "COMPREHENSIVE"
        );

        return new WorkoutPlanResponse(
                "AI Workout Plan",
                response.answer(),
                List.of("Push Day", "Pull Day", "Leg Day"),
                response.confidence()
        );
    }
}