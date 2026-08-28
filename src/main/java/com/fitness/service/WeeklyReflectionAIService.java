package com.fitness.service;

import com.fitness.dto.request.WeeklyReflectionRequest;
import com.fitness.dto.response.WeeklyReflectionResponse;
import com.shreeai.os.platform.sdk.SDKResponse;
import com.shreeai.os.platform.sdk.ShreeAI;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class WeeklyReflectionAIService {

    private final ShreeAI shreeAI;

    public WeeklyReflectionAIService(ShreeAI shreeAI) {
        this.shreeAI = shreeAI;
    }

    public WeeklyReflectionResponse reflect(WeeklyReflectionRequest request) {

        String prompt = """
                Create a weekly fitness reflection.

                Workouts completed: %d
                Recovery days: %d
                Average protein: %dg
                Average sleep: %d hours

                Give strengths, improvements and next week's guidance.
                """.formatted(
                request.workoutsCompleted(),
                request.recoveryDays(),
                request.averageProtein(),
                request.averageSleep()
        );

        SDKResponse response = shreeAI.chat(prompt);

        int score = calculateConsistency(request);

        String status =
                score >= 85 ? "EXCELLENT" :
                        score >= 70 ? "GOOD" :
                                score >= 50 ? "AVERAGE" :
                                        "NEEDS IMPROVEMENT";

        return new WeeklyReflectionResponse(
                score,
                status,
                response.answer(),
                strengths(request),
                improvements(request),
                response.confidence()
        );
    }

    private int calculateConsistency(WeeklyReflectionRequest r) {

        int score = 0;

        score += Math.min(r.workoutsCompleted() * 12, 48);
        score += Math.min(r.recoveryDays() * 6, 18);
        score += Math.min(r.averageProtein() / 10, 20);
        score += Math.min(r.averageSleep() * 2, 14);

        return Math.min(score, 100);
    }

    private List<String> strengths(WeeklyReflectionRequest r) {

        List<String> list = new ArrayList<>();

        if (r.workoutsCompleted() >= 5)
            list.add("Excellent workout consistency");

        if (r.averageProtein() >= 140)
            list.add("Protein intake supports muscle growth");

        if (r.averageSleep() >= 7)
            list.add("Healthy sleep recovery");

        return list;
    }

    private List<String> improvements(WeeklyReflectionRequest r) {

        List<String> list = new ArrayList<>();

        if (r.averageSleep() < 7)
            list.add("Increase sleep to 7–8 hours");

        if (r.recoveryDays() < 2)
            list.add("Schedule at least 2 recovery days");

        if (r.averageProtein() < 120)
            list.add("Increase daily protein intake");

        return list;
    }
}