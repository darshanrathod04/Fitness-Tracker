package com.fitness.dto.response;

import lombok.*;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DailyNutritionResponse {

    private String date;
    private Integer totalCalories;
    private Double totalProtein;
    private Double totalCarbs;
    private Double totalFat;
    private Double totalFiber;
    private Integer totalWaterMl;
    private Integer meals;
    private Map<Object, Object> breakdown;
    private List<FoodEntryResponse> foodEntries;
}