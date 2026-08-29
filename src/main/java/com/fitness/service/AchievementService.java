package com.fitness.service;

import com.fitness.dto.response.AchievementResponse;
import com.fitness.entity.*;
import com.fitness.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AchievementService {

    private final UserService userService;
    private final AchievementRepository achievementRepository;
    private final ActivityRepository activityRepository;
    private final GoalRepository goalRepository;
    private final WaterLogRepository waterLogRepository;
    private final WeightLogRepository weightLogRepository;
    private final StreakService streakService;

    public List<AchievementResponse> getAchievements(String email, boolean check) {
        User user = userService.getByEmail(email);
        if (check) {
            evaluateAndPersist(user);
        }

        List<Achievement> earned = achievementRepository
                .findByUserIdOrderByEarnedAtDesc(user.getId());

        List<AchievementResponse> responses = new ArrayList<>();
        for (Catalog c : Catalog.values()) {
            Achievement found = earned.stream()
                    .filter(a -> a.getCode().equals(c.code))
                    .findFirst()
                    .orElse(null);

            if (found != null) {
                responses.add(AchievementResponse.builder()
                        .code(c.code)
                        .title(c.title)
                        .description(c.description)
                        .icon(c.icon)
                        .earned(true)
                        .progress(1.0)
                        .earnedAt(found.getEarnedAt())
                        .build());
            } else {
                responses.add(AchievementResponse.builder()
                        .code(c.code)
                        .title(c.title)
                        .description(c.description)
                        .icon(c.icon)
                        .earned(false)
                        .progress(Math.round(progressFor(user, c) * 100.0) / 100.0)
                        .build());
            }
        }
        return responses;
    }

    public List<AchievementResponse> getEarned(String email) {
        User user = userService.getByEmail(email);
        return achievementRepository.findByUserIdOrderByEarnedAtDesc(user.getId())
                .stream()
                .map(a -> AchievementResponse.builder()
                        .code(a.getCode())
                        .title(a.getTitle())
                        .description(a.getDescription())
                        .icon(a.getIcon())
                        .earned(true)
                        .progress(1.0)
                        .earnedAt(a.getEarnedAt())
                        .build())
                .toList();
    }

    /**
     * Evaluate all rules and persist newly satisfied achievements.
     */
    public void evaluateAndPersist(User user) {
        for (Catalog c : Catalog.values()) {
            if (achievementRepository.existsByUserIdAndCode(user.getId(), c.code)) {
                continue;
            }
            if (satisfied(user, c)) {
                achievementRepository.save(Achievement.builder()
                        .code(c.code)
                        .title(c.title)
                        .description(c.description)
                        .icon(c.icon)
                        .user(user)
                        .build());
            }
        }
    }

    private boolean satisfied(User user, Catalog c) {
        return switch (c.code) {
            case "FIRST_WORKOUT" -> activityCount(user) >= 1;
            case "WORKOUTS_10" -> activityCount(user) >= 10;
            case "WORKOUTS_100" -> activityCount(user) >= 100;
            case "STREAK_7" -> streakService.bestStreak(user.getEmail()) >= 7;
            case "STREAK_30" -> streakService.bestStreak(user.getEmail()) >= 30;
            case "FIRST_GOAL" -> goalCount(user) >= 1;
            case "GOAL_CALORIES" -> completedGoal(user, GoalType.DAILY_CALORIES);
            case "GOAL_WEIGHT" -> completedGoal(user, GoalType.WEIGHT_TARGET);
            case "FIRST_WATER" -> waterToday(user) >= 1;
            case "WATER_DAY" -> waterToday(user) >= 2000;
            case "LOGGED_WEIGHT" -> weightCount(user) >= 1;
            default -> false;
        };
    }

    private double progressFor(User user, Catalog c) {
        return switch (c.code) {
            case "FIRST_WORKOUT" -> ratio(activityCount(user), 1);
            case "WORKOUTS_10" -> ratio(activityCount(user), 10);
            case "WORKOUTS_100" -> ratio(activityCount(user), 100);
            case "STREAK_7" -> ratio(streakService.bestStreak(user.getEmail()), 7);
            case "STREAK_30" -> ratio(streakService.bestStreak(user.getEmail()), 30);
            case "FIRST_GOAL" -> goalCount(user) >= 1 ? 1.0 : 0.0;
            case "GOAL_CALORIES", "GOAL_WEIGHT" ->
                    (completedGoal(user, GoalType.DAILY_CALORIES)
                            || completedGoal(user, GoalType.WEIGHT_TARGET))
                            ? 1.0 : 0.0;
            case "FIRST_WATER" -> waterToday(user) >= 1 ? 1.0 : 0.0;
            case "WATER_DAY" -> ratio(waterToday(user), 2000);
            case "LOGGED_WEIGHT" -> weightCount(user) >= 1 ? 1.0 : 0.0;
            default -> 0.0;
        };
    }

    private double ratio(double value, double target) {
        if (target <= 0) {
            return 0;
        }
        double p = value / target;
        return Math.max(0.0, Math.min(1.0, p));
    }

    private int activityCount(User user) {
        return activityRepository.findByUserId(user.getId()).size();
    }

    private int goalCount(User user) {
        return goalRepository.findByUserId(user.getId()).size();
    }

    private boolean completedGoal(User user, GoalType type) {
        return goalRepository.findByUserId(user.getId()).stream()
                .anyMatch(g -> g.getType() == type
                        && g.getStatus() == GoalStatus.COMPLETED);
    }

    private int waterToday(User user) {
        return waterLogRepository
                .findByUserIdAndLoggedDateBetween(
                        user.getId(), LocalDate.now(), LocalDate.now())
                .stream().mapToInt(WaterLog::getAmountMl).sum();
    }

    private int weightCount(User user) {
        return weightLogRepository
                .findByUserIdOrderByLoggedDateAsc(user.getId()).size();
    }

    private enum Catalog {
        FIRST_WORKOUT("FIRST_WORKOUT", "First Workout",
                "Log your very first activity.", "flame"),
        WORKOUTS_10("WORKOUTS_10", "Getting Started",
                "Complete 10 workouts.", "trophy"),
        WORKOUTS_100("WORKOUTS_100", "Century Club",
                "Complete 100 workouts.", "trophy"),
        STREAK_7("STREAK_7", "Week Warrior",
                "Stay active 7 days in a row.", "calendar"),
        STREAK_30("STREAK_30", "True Commitment",
                "Keep an active streak of 30 days.", "bonfire"),
        FIRST_GOAL("FIRST_GOAL", "Goal Setter",
                "Create your first goal.", "flag"),
        GOAL_CALORIES("GOAL_CALORIES", "Calorie Crusher",
                "Reach a calorie goal.", "flame"),
        GOAL_WEIGHT("GOAL_WEIGHT", "Body Transformation",
                "Hit a weight target goal.", "scale"),
        FIRST_WATER("FIRST_WATER", "Hydrated",
                "Log your first water intake.", "water"),
        WATER_DAY("WATER_DAY", "Hydration Hero",
                "Drink 2L of water in a day.", "water"),
        LOGGED_WEIGHT("LOGGED_WEIGHT", "On the Scale",
                "Log your weight for the first time.", "scale");

        final String code;
        final String title;
        final String description;
        final String icon;

        Catalog(String code, String title, String description, String icon) {
            this.code = code;
            this.title = title;
            this.description = description;
            this.icon = icon;
        }
    }
}