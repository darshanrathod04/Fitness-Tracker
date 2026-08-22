package com.fitness.service;

import com.fitness.dto.response.RecommendationResponse;
import com.fitness.entity.Activity;
import com.fitness.entity.User;
import com.fitness.repository.ActivityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RecommendationService {

    private final UserService userService;
    private final ActivityRepository activityRepository;

    public List<RecommendationResponse> getRecommendations(String email) {

        User user = userService.getByEmail(email);

        List<Activity> activities =
                activityRepository.findByUserId(user.getId());

        int totalCalories = activities.stream()
                .mapToInt(Activity::getCalories)
                .sum();

        int totalMinutes = activities.stream()
                .mapToInt(Activity::getDuration)
                .sum();

        RecommendationResponse cardio;
        RecommendationResponse nutrition;
        RecommendationResponse hydration;

        // Cardio Recommendation
        if (totalMinutes < 60) {
            cardio = RecommendationResponse.builder()
                    .title("Increase Weekly Cardio")
                    .description("Target at least 150 minutes of exercise per week.")
                    .level("HIGH")
                    .build();
        } else {
            cardio = RecommendationResponse.builder()
                    .title("Excellent Consistency")
                    .description("You're maintaining a healthy activity level.")
                    .level("LOW")
                    .build();
        }

        // Nutrition Recommendation
        if (user.getWeight() != null && user.getWeight() > 85) {
            nutrition = RecommendationResponse.builder()
                    .title("Weight Management")
                    .description("Increase protein intake and reduce processed sugar.")
                    .level("MEDIUM")
                    .build();
        } else {
            nutrition = RecommendationResponse.builder()
                    .title("Balanced Nutrition")
                    .description("Maintain your current healthy diet.")
                    .level("LOW")
                    .build();
        }

        // Hydration Recommendation
        hydration = RecommendationResponse.builder()
                .title("Hydration Goal")
                .description("Drink 2.5–3 liters of water daily.")
                .level(totalCalories > 1500 ? "HIGH" : "MEDIUM")
                .build();

        return List.of(cardio, nutrition, hydration);
    }

    public List<Activity> getActivitiesByType(String email, String type) {

        User user = userService.getByEmail(email);

        return activityRepository.findByUserIdAndType(
                user.getId(),
                type
        );
    }
}