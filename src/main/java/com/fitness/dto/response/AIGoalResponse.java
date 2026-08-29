package com.fitness.dto.response;

public record AIGoalResponse(

        Long id,

        String goal,

        String experience,

        Integer targetCalories,

        Integer targetProtein
) {}