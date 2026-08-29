package com.fitness.service;

import com.fitness.dto.request.RecoveryRequest;
import com.fitness.dto.response.RecoveryResponse;
import com.shreeai.os.platform.sdk.SDKResponse;
import com.shreeai.os.platform.sdk.ShreeAI;
import org.springframework.stereotype.Service;

@Service
public class RecoveryAIService {

    private final ShreeAI shreeAI;

    public RecoveryAIService(ShreeAI shreeAI) {
        this.shreeAI = shreeAI;
    }

    public RecoveryResponse analyzeRecovery(RecoveryRequest request) {

        String prompt = """
                Analyze this fitness recovery state.

                Sleep Hours: %d
                Muscle Soreness: %s
                Fatigue Level: %s

                Give recovery advice for today's workout.
                """.formatted(
                request.sleepHours(),
                request.soreness(),
                request.fatigue()
        );

        SDKResponse response = shreeAI.chat(prompt);

        int score = calculateScore(request);

        String recommendation =
                score >= 80 ? "TRAIN" :
                        score >= 60 ? "REDUCE VOLUME" :
                                "REST";

        return new RecoveryResponse(
                score,
                recommendation,
                response.answer(),
                response.confidence()
        );
    }

    private int calculateScore(RecoveryRequest request) {

        int score = 100;

        score -= Math.max(0, (7 - request.sleepHours()) * 10);

        if ("HIGH".equalsIgnoreCase(request.soreness()))
            score -= 20;
        else if ("MEDIUM".equalsIgnoreCase(request.soreness()))
            score -= 10;

        if ("HIGH".equalsIgnoreCase(request.fatigue()))
            score -= 20;
        else if ("MEDIUM".equalsIgnoreCase(request.fatigue()))
            score -= 10;

        return Math.max(score, 0);
    }
}