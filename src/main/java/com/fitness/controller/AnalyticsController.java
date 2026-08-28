package com.fitness.controller;

import com.fitness.dto.response.AnalyticsResponse;
import com.fitness.entity.User;
import com.fitness.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping
    public AnalyticsResponse getAnalytics(
            @AuthenticationPrincipal User user,
            @RequestParam(defaultValue = "WEEK") String range) {
        return analyticsService.getAnalytics(user.getEmail(), range);
    }
}