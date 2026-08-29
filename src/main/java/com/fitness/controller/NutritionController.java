package com.fitness.controller;

import com.fitness.dto.request.FoodEntryRequest;
import com.fitness.dto.request.WaterLogRequest;
import com.fitness.dto.response.DailyNutritionResponse;
import com.fitness.dto.response.FoodEntryResponse;
import com.fitness.entity.User;
import com.fitness.service.NutritionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/api/nutrition")
@RequiredArgsConstructor
public class NutritionController {

    private final NutritionService nutritionService;

    @PostMapping("/food")
    public FoodEntryResponse addFood(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody FoodEntryRequest request) {
        return nutritionService.addFood(user.getEmail(), request);
    }

    @DeleteMapping("/food/{id}")
    public String deleteFood(
            @AuthenticationPrincipal User user,
            @PathVariable Long id) {
        nutritionService.deleteFood(user.getEmail(), id);
        return "Food entry deleted";
    }

    @PostMapping("/water")
    public Map<String, Object> addWater(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody WaterLogRequest request) {
        return nutritionService.addWater(user.getEmail(), request);
    }

    @DeleteMapping("/water/{id}")
    public String deleteWater(
            @AuthenticationPrincipal User user,
            @PathVariable Long id) {
        nutritionService.deleteWater(user.getEmail(), id);
        return "Water entry deleted";
    }

    @GetMapping("/daily")
    public DailyNutritionResponse getDaily(
            @AuthenticationPrincipal User user,
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return nutritionService.getDaily(user.getEmail(), date);
    }
}