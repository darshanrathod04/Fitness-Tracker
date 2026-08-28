package com.fitness.dto.response;

import lombok.*;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnalyticsResponse {

    private String range; // WEEK | MONTH
    private Double totalCalories;
    private Double totalActiveMinutes;
    private Long totalSteps;
    private Long daysActive;

    private Map<String, Object> streak;
    private Map<String, Long> activityBreakdown;
    private Map<String, Object> weightChange;
    private List<Map<String, Object>> dailySeries;
    private List<WeightLogResponse> weightHistory;
}