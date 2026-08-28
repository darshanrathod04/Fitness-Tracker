package com.fitness.service;

import com.fitness.dto.ai.MemoryContext;
import com.fitness.dto.request.AdaptivePlanRequest;
import com.fitness.dto.response.AdaptivePlanResponse;
import com.shreeai.os.platform.sdk.SDKResponse;
import com.shreeai.os.platform.sdk.ShreeAI;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdaptivePlanService {

    private final ShreeAI shreeAI;
    private final MemoryContextService memoryContextService;

    public AdaptivePlanResponse evolve(AdaptivePlanRequest request){

        MemoryContext memory = memoryContextService.load(request.userId());

        String prompt = """
        Create next week's fitness evolution.

        Goal: %s
        Experience: %s
        Previous Plans: %s

        Workouts: %d
        Energy: %d/10
        Soreness: %d/10

        Recommend whether to increase volume,
        maintain intensity or deload.
        """.formatted(
                memory.goal(),
                memory.experience(),
                String.join("\n", memory.recentObjectives()),
                request.workoutsCompleted(),
                request.energyLevel(),
                request.soreness()
        );

        SDKResponse ai = shreeAI.planning().createPlan(
                "adaptive-" + request.userId(),
                prompt,
                "COMPREHENSIVE"
        );

        return new AdaptivePlanResponse(
                strategy(request),
                ai.answer(),
                adjustments(request),
                ai.confidence()
        );
    }

    private String strategy(AdaptivePlanRequest r){

        if(r.soreness() >= 8) return "DELOAD WEEK";

        if(r.energyLevel() >= 8 && r.workoutsCompleted() >= 5)
            return "INCREASE VOLUME";

        return "MAINTAIN";
    }

    private List<String> adjustments(AdaptivePlanRequest r){

        List<String> list = new ArrayList<>();

        if("INCREASE VOLUME".equals(strategy(r))){
            list.add("Increase compound lifts by 10%");
            list.add("Add one accessory exercise");
        }

        if("MAINTAIN".equals(strategy(r))){
            list.add("Keep current volume");
            list.add("Improve exercise technique");
        }

        if("DELOAD WEEK".equals(strategy(r))){
            list.add("Reduce volume by 40%");
            list.add("Focus on mobility and recovery");
        }

        return list;
    }
}