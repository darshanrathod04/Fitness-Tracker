package com.fitness.controller;

import com.fitness.dto.response.RecommendationResponse;
import com.fitness.entity.Activity;
import com.fitness.service.RecommendationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
@RequiredArgsConstructor
public class RecommendationController {

    private final RecommendationService recommendationService;

    @GetMapping
    public List<RecommendationResponse> getRecommendations(
            @AuthenticationPrincipal User user) {

        return recommendationService.getRecommendations(
                user.getUsername()
        );
    }

    @GetMapping("/activity/{type}")
    public List<Activity> byActivity(
            @AuthenticationPrincipal User user,
            @PathVariable String type) {

        return recommendationService.getActivitiesByType(
                user.getUsername(),
                type
        );
    }
}