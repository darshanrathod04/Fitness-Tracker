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
                "Create a 3-day Push Pull Legs workout for a %d year old. Goal: %s. Experience: %s",
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
                extractSection(response.answer(), "Executive Summary"),
                request.goal(),
                extractSection(response.answer(), "Feasibility"),
                extractSection(response.answer(), "Priority"),
                List.of("Push Day", "Pull Day", "Leg Day"),
                List.of(
                        "Progressive overload",
                        "Take 2 rest days weekly",
                        "Track recovery every workout"
                ),
                response.confidence()
        );
    }

    private String extractSection(String markdown, String heading) {

        String marker = "## " + heading;
        int start = markdown.indexOf(marker);

        if (start == -1) {
            return "";
        }

        start += marker.length();

        int end = markdown.indexOf("\n## ", start);

        if (end == -1) {
            end = markdown.length();
        }

        return markdown.substring(start, end).trim();
    }
}