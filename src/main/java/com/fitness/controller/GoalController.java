package com.fitness.controller;

import com.fitness.dto.request.GoalRequest;
import com.fitness.dto.response.GoalResponse;
import com.fitness.entity.GoalStatus;
import com.fitness.entity.User;
import com.fitness.service.GoalService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/goals")
@RequiredArgsConstructor
public class GoalController {

    private final GoalService goalService;

    @GetMapping
    public List<GoalResponse> getGoals(@AuthenticationPrincipal User user) {
        return goalService.getGoals(user.getEmail());
    }

    @PostMapping
    public GoalResponse createGoal(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody GoalRequest request) {
        return goalService.createGoal(user.getEmail(), request);
    }

    @PutMapping("/{id}")
    public GoalResponse updateGoal(
            @AuthenticationPrincipal User user,
            @PathVariable Long id,
            @Valid @RequestBody GoalRequest request) {
        return goalService.updateGoal(user.getEmail(), id, request);
    }

    @PatchMapping("/{id}/status")
    public GoalResponse setStatus(
            @AuthenticationPrincipal User user,
            @PathVariable Long id,
            @RequestParam GoalStatus status) {
        return goalService.setStatus(user.getEmail(), id, status);
    }

    @DeleteMapping("/{id}")
    public String deleteGoal(
            @AuthenticationPrincipal User user,
            @PathVariable Long id) {
        goalService.deleteGoal(user.getEmail(), id);
        return "Goal deleted successfully";
    }
}