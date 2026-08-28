package com.fitness.dto.response;

import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WeightLogResponse {

    private Long id;
    private Double weightKg;
    private Double bmi;
    private String note;
    private LocalDate loggedDate;
    private List<WeightLogResponse> history;
}