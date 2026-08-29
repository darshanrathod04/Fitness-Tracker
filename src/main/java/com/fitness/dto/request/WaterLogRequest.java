package com.fitness.dto.request;

import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WaterLogRequest {

    @NotNull(message = "Amount is required")
    @Positive(message = "Amount must be positive")
    private Integer amountMl;

    private LocalDate loggedDate;
}