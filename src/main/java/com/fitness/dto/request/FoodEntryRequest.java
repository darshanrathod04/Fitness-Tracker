package com.fitness.dto.request;

import com.fitness.entity.MealType;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FoodEntryRequest {

    @NotNull(message = "Meal type is required")
    private MealType mealType;

    @NotBlank(message = "Food name is required")
    private String name;

    @NotNull(message = "Calories are required")
    @PositiveOrZero
    private Integer calories;

    @PositiveOrZero
    private Double proteinG;

    @PositiveOrZero
    private Double carbsG;

    @PositiveOrZero
    private Double fatG;

    @PositiveOrZero
    private Double fiberG;

    private LocalDate loggedDate;
}