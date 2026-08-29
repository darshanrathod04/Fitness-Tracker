package com.fitness.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AchievementResponse {

    private String code;
    private String title;
    private String description;
    private String icon;
    private boolean earned;
    private Double progress; // 0.0 - 1.0 towards earning
    private java.time.LocalDateTime earnedAt;
}