package com.fitness.controller;

import com.fitness.dto.response.AchievementResponse;
import com.fitness.entity.User;
import com.fitness.service.AchievementService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/achievements")
@RequiredArgsConstructor
public class AchievementController {

    private final AchievementService achievementService;

    @GetMapping
    public List<AchievementResponse> getAchievements(
            @AuthenticationPrincipal User user,
            @RequestParam(defaultValue = "true") boolean check) {
        return achievementService.getAchievements(user.getEmail(), check);
    }

    @GetMapping("/earned")
    public List<AchievementResponse> getEarned(@AuthenticationPrincipal User user) {
        return achievementService.getEarned(user.getEmail());
    }
}