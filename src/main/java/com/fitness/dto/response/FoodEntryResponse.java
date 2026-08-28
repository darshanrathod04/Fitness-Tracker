package com.fitness.dto.response;

import com.fitness.entity.MealType;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FoodEntryResponse {

    private Long id;
    private MealType mealType;
    private String name;
    private Integer calories;
    private Double proteinG;
    private Double carbsG;
    private Double fatG;
    private Double fiberG;
    private LocalDate loggedDate;
}