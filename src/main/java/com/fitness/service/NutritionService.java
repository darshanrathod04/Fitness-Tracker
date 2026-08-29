package com.fitness.service;

import com.fitness.dto.request.FoodEntryRequest;
import com.fitness.dto.request.WaterLogRequest;
import com.fitness.dto.response.DailyNutritionResponse;
import com.fitness.dto.response.FoodEntryResponse;
import com.fitness.entity.*;
import com.fitness.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class NutritionService {

    private final UserService userService;
    private final FoodEntryRepository foodEntryRepository;
    private final WaterLogRepository waterLogRepository;

    public FoodEntryResponse addFood(String email, FoodEntryRequest request) {
        User user = userService.getByEmail(email);

        FoodEntry entry = FoodEntry.builder()
                .mealType(request.getMealType())
                .name(request.getName())
                .calories(request.getCalories())
                .proteinG(request.getProteinG())
                .carbsG(request.getCarbsG())
                .fatG(request.getFatG())
                .fiberG(request.getFiberG())
                .loggedDate(request.getLoggedDate() != null
                        ? request.getLoggedDate() : LocalDate.now())
                .user(user)
                .build();

        return toResponse(foodEntryRepository.save(entry));
    }

    public void deleteFood(String email, Long id) {
        User user = userService.getByEmail(email);
        FoodEntry entry = foodEntryRepository.findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new RuntimeException("Food entry not found"));
        foodEntryRepository.delete(entry);
    }

    public Map<String, Object> addWater(String email, WaterLogRequest request) {
        User user = userService.getByEmail(email);

        WaterLog log = WaterLog.builder()
                .amountMl(request.getAmountMl())
                .loggedDate(request.getLoggedDate() != null
                        ? request.getLoggedDate() : LocalDate.now())
                .user(user)
                .build();

        waterLogRepository.save(log);

        LocalDate date = log.getLoggedDate();
        int total = waterLogRepository
                .findByUserIdAndLoggedDateBetween(user.getId(), date, date)
                .stream()
                .mapToInt(WaterLog::getAmountMl)
                .sum();

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("logged", request.getAmountMl());
        result.put("totalMl", total);
        result.put("date", date.toString());
        return result;
    }

    public void deleteWater(String email, Long id) {
        User user = userService.getByEmail(email);
        WaterLog log = waterLogRepository.findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new RuntimeException("Water entry not found"));
        waterLogRepository.delete(log);
    }

    public DailyNutritionResponse getDaily(String email, LocalDate date) {
        User user = userService.getByEmail(email);
        LocalDate d = date != null ? date : LocalDate.now();

        List<FoodEntry> entries = foodEntryRepository
                .findByUserIdAndLoggedDateOrderByCreatedAtAsc(user.getId(), d);

        List<WaterLog> waters = waterLogRepository
                .findByUserIdAndLoggedDateOrderByCreatedAtAsc(user.getId(), d);

        int totalCalories = entries.stream().mapToInt(FoodEntry::getCalories).sum();
        int totalWater = waters.stream().mapToInt(WaterLog::getAmountMl).sum();

        return DailyNutritionResponse.builder()
                .date(d.toString())
                .totalCalories(totalCalories)
                .totalProtein(round(safe(entries, FoodEntry::getProteinG)))
                .totalCarbs(round(safe(entries, FoodEntry::getCarbsG)))
                .totalFat(round(safe(entries, FoodEntry::getFatG)))
                .totalFiber(round(safe(entries, FoodEntry::getFiberG)))
                .totalWaterMl(totalWater)
                .meals(entries.size())
                .breakdown(breakdownByMeal(entries))
                .foodEntries(entries.stream().map(this::toResponse).toList())
                .build();
    }

    private Map<Object, Object> breakdownByMeal(List<FoodEntry> entries) {
        Map<Object, Object> map = new LinkedHashMap<>();
        for (MealType mealType : MealType.values()) {
            int cals = entries.stream()
                    .filter(e -> e.getMealType() == mealType)
                    .mapToInt(FoodEntry::getCalories)
                    .sum();
            map.put(mealType.name(), cals);
        }
        return map;
    }

    private double safe(List<FoodEntry> entries, ToDouble fn) {
        return entries.stream()
                .mapToDouble(e -> {
                    Double v = fn.apply(e);
                    return v == null ? 0.0 : v;
                })
                .sum();
    }

    private double round(double v) {
        return Math.round(v * 100.0) / 100.0;
    }

    private FoodEntryResponse toResponse(FoodEntry entry) {
        return FoodEntryResponse.builder()
                .id(entry.getId())
                .mealType(entry.getMealType())
                .name(entry.getName())
                .calories(entry.getCalories())
                .proteinG(entry.getProteinG())
                .carbsG(entry.getCarbsG())
                .fatG(entry.getFatG())
                .fiberG(entry.getFiberG())
                .loggedDate(entry.getLoggedDate())
                .build();
    }

    @FunctionalInterface
    private interface ToDouble {
        Double apply(FoodEntry e);
    }
}