package com.fitness.controller;

import com.fitness.dto.request.AIGoalRequest;
import com.fitness.dto.response.AIGoalResponse;
import com.fitness.service.AIGoalService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai/goals")
@RequiredArgsConstructor
public class AIGoalController {

    private final AIGoalService goalService;

    @PostMapping("/{userId}")
    public AIGoalResponse saveGoal(
            @PathVariable Long userId,
            @Valid @RequestBody AIGoalRequest request
    ) {
        return goalService.saveGoal(userId, request);
    }

    @GetMapping("/{userId}")
    public AIGoalResponse getGoal(
            @PathVariable Long userId
    ) {
        return goalService.getGoal(userId);
    }
}