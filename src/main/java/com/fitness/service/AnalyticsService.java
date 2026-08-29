package com.fitness.service;

import com.fitness.dto.response.AnalyticsResponse;
import com.fitness.dto.response.WeightLogResponse;
import com.fitness.entity.Activity;
import com.fitness.entity.User;
import com.fitness.repository.ActivityRepository;
import com.fitness.repository.WeightLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private static final int WEEK_DAYS = 7;
    private static final int MONTH_DAYS = 30;
    private static final int STEPS_PER_MINUTE = 140;

    private final UserService userService;
    private final ActivityRepository activityRepository;
    private final WeightLogRepository weightLogRepository;
    private final StreakService streakService;

    public AnalyticsResponse getAnalytics(String email, String range) {
        User user = userService.getByEmail(email);
        String normalized = range == null || range.isBlank()
                ? "WEEK" : range.trim().toUpperCase();

        int days = normalized.startsWith("MONTH") ? MONTH_DAYS : WEEK_DAYS;
        LocalDate today = LocalDate.now();
        LocalDate start = today.minusDays(days - 1L);

        List<Activity> activities = activityRepository
                .findByUserIdAndActivityDateBetween(user.getId(), start, today);

        double totalCalories = activities.stream()
                .mapToDouble(Activity::getCalories).sum();
        double totalMinutes = activities.stream()
                .mapToDouble(Activity::getDuration).sum();
        long totalSteps = Math.round(totalMinutes * STEPS_PER_MINUTE);
        long activeDays = activities.stream()
                .map(Activity::getActivityDate)
                .filter(d -> d != null)
                .distinct()
                .count();

        Map<String, Long> breakdown = new HashMap<>();
        activities.forEach(a -> breakdown.merge(a.getType(), 1L, Long::sum));

        List<WeightLogResponse> weightHistory = weightLogRepository
                .findByUserIdAndLoggedDateBetweenOrderByLoggedDateAsc(
                        user.getId(), start, today)
                .stream()
                .map(w -> WeightLogResponse.builder()
                        .id(w.getId())
                        .weightKg(w.getWeightKg())
                        .bmi(w.getBmi())
                        .note(w.getNote())
                        .loggedDate(w.getLoggedDate())
                        .build())
                .toList();

        Map<String, Object> weightChange = buildWeightChange(weightHistory);

        Map<String, Object> streak = new HashMap<>();
        streak.put("current", streakService.currentStreak(email));
        streak.put("best", streakService.bestStreak(email));

        return AnalyticsResponse.builder()
                .range(normalized)
                .totalCalories(Math.round(totalCalories * 100.0) / 100.0)
                .totalActiveMinutes(Math.round(totalMinutes * 100.0) / 100.0)
                .totalSteps(totalSteps)
                .daysActive(activeDays)
                .streak(streak)
                .activityBreakdown(breakdown)
                .weightChange(weightChange)
                .dailySeries(dailySeries(user, start, today))
                .weightHistory(weightHistory)
                .build();
    }

    private Map<String, Object> buildWeightChange(List<WeightLogResponse> history) {
        Map<String, Object> map = new HashMap<>();
        if (history.isEmpty()) {
            map.put("start", null);
            map.put("end", null);
            map.put("delta", 0.0);
        } else {
            double startW = history.get(0).getWeightKg();
            double endW = history.get(history.size() - 1).getWeightKg();
            map.put("start", startW);
            map.put("end", endW);
            map.put("delta", Math.round((endW - startW) * 100.0) / 100.0);
        }
        return map;
    }

    private List<Map<String, Object>> dailySeries(User user, LocalDate start,
                                                  LocalDate end) {
        List<Map<String, Object>> series = new ArrayList<>();
        for (LocalDate date = start; !date.isAfter(end); date = date.plusDays(1)) {
            List<Activity> day = activityRepository
                    .findByUserIdAndActivityDateBetween(user.getId(), date, date);

            double minutes = day.stream().mapToDouble(Activity::getDuration).sum();
            double calories = day.stream().mapToDouble(Activity::getCalories).sum();

            Map<String, Object> point = new HashMap<>();
            point.put("date", date.toString());
            point.put("minutes", minutes);
            point.put("calories", calories);

            series.add(point);
        }
        return series;
    }
}