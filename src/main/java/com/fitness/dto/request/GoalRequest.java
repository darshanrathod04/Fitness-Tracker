package com.fitness.dto.request;

import com.fitness.entity.GoalType;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GoalRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @NotNull(message = "Goal type is required")
    private GoalType type;

    @NotNull(message = "Target value is required")
    @Positive(message = "Target value must be positive")
    private Double targetValue;

    private String unit;

    private LocalDate startDate;

    private LocalDate endDate;
}