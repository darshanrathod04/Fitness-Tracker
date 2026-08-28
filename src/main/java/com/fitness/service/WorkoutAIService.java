package com.fitness.service;

import com.fitness.dto.request.WorkoutGenerateRequest;
import com.fitness.dto.response.WorkoutPlanResponse;
import com.fitness.entity.AIGoal;
import com.fitness.repository.AIGoalRepository;
import com.shreeai.os.platform.sdk.SDKResponse;
import com.shreeai.os.platform.sdk.ShreeAI;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WorkoutAIService {

    private final ShreeAI shreeAI;
    private final AIGoalRepository goalRepository;

    public WorkoutPlanResponse generatePlan(WorkoutGenerateRequest request) {

        AIGoal goal = goalRepository.findByUserId(request.userId())
                .orElseThrow(() ->
                        new RuntimeException("Please create AI Goal first."));

        String objective = String.format(
                """
                Create a personalized 3-day Push Pull Legs workout.

                Goal: %s
                Experience: %s
                Age: %d
                Target Calories: %d
                Target Protein: %dg
                """,
                goal.getGoal(),
                goal.getExperience(),
                request.age(),
                goal.getTargetCalories(),
                goal.getTargetProtein()
        );

        SDKResponse response = shreeAI.planning().createPlan(
                "fitpulse-user-" + request.userId(),
                objective,
                "COMPREHENSIVE"
        );

        return new WorkoutPlanResponse(
                "Personalized AI Workout",
                extractSection(response.answer(), "Executive Summary"),
                goal.getGoal(),
                extractSection(response.answer(), "Feasibility"),
                extractSection(response.answer(), "Priority"),
                List.of("Push Day", "Pull Day", "Leg Day"),
                List.of(
                        "Progressive overload",
                        "Respect recovery",
                        "Increase weight gradually"
                ),
                response.confidence()
        );
    }

    private String extractSection(String markdown, String heading) {
        String marker = "## " + heading;
        int start = markdown.indexOf(marker);

        if (start == -1) return "";

        start += marker.length();

        int end = markdown.indexOf("\n## ", start);

        if (end == -1) end = markdown.length();

        return markdown.substring(start, end).trim();
    }
}