package com.fitness.dto.response;

import com.fitness.entity.GoalStatus;
import com.fitness.entity.GoalType;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GoalResponse {

    private Long id;
    private String title;
    private GoalType type;
    private Double targetValue;
    private Double currentValue;
    private String unit;
    private GoalStatus status;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer progress; // 0-100
    private boolean completed;
}