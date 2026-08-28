package com.fitness.dto.request;

import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WeightLogRequest {

    @NotNull(message = "Weight is required")
    @Positive(message = "Weight must be positive")
    private Double weightKg;

    private String note;

    private LocalDate loggedDate;
}