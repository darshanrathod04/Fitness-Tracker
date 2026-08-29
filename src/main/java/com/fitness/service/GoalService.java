package com.fitness.service;

import com.fitness.dto.request.GoalRequest;
import com.fitness.dto.response.GoalResponse;
import com.fitness.entity.*;
import com.fitness.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GoalService {

    private final UserService userService;
    private final GoalRepository goalRepository;
    private final ActivityRepository activityRepository;
    private final WaterLogRepository waterLogRepository;
    private final WeightLogRepository weightLogRepository;

    public GoalResponse createGoal(String email, GoalRequest request) {
        User user = userService.getByEmail(email);

        Goal goal = Goal.builder()
                .title(request.getTitle())
                .type(request.getType())
                .targetValue(request.getTargetValue())
                .unit(unitOf(request.getType(), request.getUnit()))
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .user(user)
                .build();

        return map(goalRepository.save(goal), email);
    }

    public List<GoalResponse> getGoals(String email) {
        User user = userService.getByEmail(email);
        return goalRepository.findByUserId(user.getId()).stream()
                .map(goal -> map(goal, email))
                .collect(Collectors.toList());
    }

    public GoalResponse updateGoal(String email, Long id, GoalRequest request) {
        User user = userService.getByEmail(email);
        Goal goal = goalRepository.findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new RuntimeException("Goal not found"));

        goal.setTitle(request.getTitle());
        goal.setType(request.getType());
        goal.setTargetValue(request.getTargetValue());
        goal.setUnit(unitOf(request.getType(), request.getUnit()));
        goal.setStartDate(request.getStartDate());
        goal.setEndDate(request.getEndDate());

        return map(goalRepository.save(goal), email);
    }

    public void deleteGoal(String email, Long id) {
        User user = userService.getByEmail(email);
        Goal goal = goalRepository.findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new RuntimeException("Goal not found"));
        goalRepository.delete(goal);
    }

    public GoalResponse setStatus(String email, Long id, GoalStatus status) {
        User user = userService.getByEmail(email);
        Goal goal = goalRepository.findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new RuntimeException("Goal not found"));
        goal.setStatus(status);
        return map(goalRepository.save(goal), email);
    }

    public Double currentValue(Goal goal, String email) {
        Long userId = goal.getUser().getId();
        LocalDate today = LocalDate.now();

        return switch (goal.getType()) {
            case DAILY_CALORIES -> dailySum(
                    activityRepository.findByUserIdAndActivityDateBetween(
                            userId, today, today), true);
            case DAILY_ACTIVE_MINUTES -> dailySum(
                    activityRepository.findByUserIdAndActivityDateBetween(
                            userId, today, today), false);
            case DAILY_STEPS -> dailySum(
                    activityRepository.findByUserIdAndActivityDateBetween(
                            userId, today, today), false) * 140;
            case WATER -> waterLogRepository
                    .findByUserIdAndLoggedDateBetween(
                            userId, startOf(goal), today)
                    .stream()
                    .mapToInt(WaterLog::getAmountMl)
                    .sum() * 1.0;
            case WEIGHT_TARGET -> weightLogRepository
                    .findTopByUserIdOrderByLoggedDateDescIdDesc(userId)
                    .map(WeightLog::getWeightKg)
                    .orElse(0.0);
        };
    }

    public double computeProgress(Goal goal, double current) {
        if (goal.getTargetValue() == null || goal.getTargetValue() <= 0) {
            return 0.0;
        }

        double raw = switch (goal.getType()) {
            case DAILY_CALORIES, DAILY_ACTIVE_MINUTES, DAILY_STEPS, WATER ->
                    current / goal.getTargetValue();
            case WEIGHT_TARGET -> progressTowardWeight(
                    current, firstWeight(goal), goal.getTargetValue());
        };

        raw = Math.max(0.0, Math.min(1.0, raw));
        return Math.round(raw * 1000.0) / 10.0;
    }

    private double progressTowardWeight(double current, Double startWeight,
                                        double target) {
        if (startWeight == null) {
            return 0.0;
        }
        double totalChange = target - startWeight;
        if (Math.abs(totalChange) < 0.001) {
            return current >= target ? 1.0 : 0.5;
        }
        double covered = current - startWeight;
        double p = covered / totalChange;
        return Math.max(0.0, Math.min(1.0, p));
    }

    private double dailySum(List<Activity> activities, boolean calories) {
        return activities.stream()
                .mapToDouble(a -> calories ? a.getCalories() : a.getDuration())
                .sum();
    }

    private LocalDate startOf(Goal goal) {
        return goal.getStartDate() != null
                ? goal.getStartDate() : LocalDate.now();
    }

    private Double firstWeight(Goal goal) {
        return weightLogRepository
                .findByUserIdAndLoggedDateBetweenOrderByLoggedDateAsc(
                        goal.getUser().getId(),
                        startOf(goal),
                        LocalDate.now())
                .stream()
                .findFirst()
                .map(WeightLog::getWeightKg)
                .orElse(null);
    }

    private String unitOf(GoalType type, String requested) {
        if (requested != null && !requested.isBlank()) {
            return requested;
        }
        return switch (type) {
            case DAILY_CALORIES -> "kcal";
            case DAILY_STEPS -> "steps";
            case DAILY_ACTIVE_MINUTES -> "min";
            case WATER -> "ml";
            case WEIGHT_TARGET -> "kg";
        };
    }

    private GoalResponse map(Goal goal, String email) {
        double current = currentValue(goal, email);
        double progressRaw = computeProgress(goal, current);
        boolean reached = progressRaw >= 100.0;

        if (reached && goal.getStatus() == GoalStatus.ACTIVE) {
            goal.setStatus(GoalStatus.COMPLETED);
            goalRepository.save(goal);
        }

        return GoalResponse.builder()
                .id(goal.getId())
                .title(goal.getTitle())
                .type(goal.getType())
                .targetValue(goal.getTargetValue())
                .currentValue(current)
                .unit(goal.getUnit())
                .status(goal.getStatus())
                .startDate(goal.getStartDate())
                .endDate(goal.getEndDate())
                .progress((int) Math.round(progressRaw))
                .completed(goal.getStatus() == GoalStatus.COMPLETED)
                .build();
    }
}