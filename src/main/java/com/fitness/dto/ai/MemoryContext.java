package com.fitness.dto.ai;

import java.util.List;

public record MemoryContext(

        String goal,
        String experience,
        Integer targetCalories,
        Integer targetProtein,
        Integer totalPlans,
        List<String> recentObjectives
) {}