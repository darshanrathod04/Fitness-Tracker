package com.fitness.controller;


import com.fitness.dto.request.WorkoutGenerateRequest;
import com.fitness.dto.request.WorkoutPlanRequest;
import com.fitness.dto.response.WorkoutPlanResponse;
import com.fitness.service.WorkoutAIService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai/workout")
public class WorkoutAIController {

    private final WorkoutAIService workoutAIService;

    public WorkoutAIController(WorkoutAIService workoutAIService) {
        this.workoutAIService = workoutAIService;
    }

    @PostMapping("/generate")
    public WorkoutPlanResponse generate(
            @Valid @RequestBody WorkoutGenerateRequest request
    ) {
        return workoutAIService.generatePlan(request);
    }
}