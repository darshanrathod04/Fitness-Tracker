package com.fitness.controller;

import com.fitness.dto.request.ActivityRequest;
import com.fitness.dto.response.ActivityResponse;
import com.fitness.entity.User;
import com.fitness.service.ActivityService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/activities")
@RequiredArgsConstructor
public class ActivityController {

    private final ActivityService activityService;

    @PostMapping
    public ActivityResponse addActivity(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody ActivityRequest request) {

        return activityService.addActivity(user.getEmail(), request);
    }

    @GetMapping
    public List<ActivityResponse> getActivities(
            @AuthenticationPrincipal User user) {

        return activityService.getUserActivities(user.getEmail());
    }
}