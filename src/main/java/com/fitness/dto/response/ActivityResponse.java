package com.fitness.dto.response;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ActivityResponse {

    private Long id;
    private String type;
    private Integer duration;
    private Integer calories;
    private LocalDate activityDate;
}
