package com.fitness.dto.request;

import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ActivityRequest {

    @NotBlank
    private String type;

    @Positive
    private Integer duration;

    @Positive
    private Integer calories;

    private LocalDate activityDate;
}