package com.fitness.service;

import com.fitness.entity.Activity;
import com.fitness.entity.User;
import com.fitness.repository.ActivityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StreakService {

    private final UserService userService;
    private final ActivityRepository activityRepository;

    public int currentStreak(String email) {
        return computeCurrent(activityDates(userService.getByEmail(email).getId()));
    }

    public int bestStreak(String email) {
        return computeBest(activityDates(userService.getByEmail(email).getId()));
    }

    /**
     * Longest consecutive run of active days found across all history.
     */
    public int computeBest(Set<LocalDate> activeDays) {
        if (activeDays.isEmpty()) {
            return 0;
        }
        List<LocalDate> sorted = activeDays.stream().sorted().toList();

        int best = 1;
        int run = 1;
        for (int i = 1; i < sorted.size(); i++) {
            if (sorted.get(i).minusDays(1).equals(sorted.get(i - 1))) {
                run++;
            } else {
                best = Math.max(best, run);
                run = 1;
            }
        }
        return Math.max(best, run);
    }

    /**
     * Streak ending today (or yesterday if today is not yet active). A streak
     * that only covers today is treated as ongoing and still counts.
     */
    public int computeCurrent(Set<LocalDate> activeDays) {
        LocalDate today = LocalDate.now();

        int count = 0;
        LocalDate cursor = activeDays.contains(today) ? today : today.minusDays(1);

        // If neither today nor yesterday is active, there is no ongoing streak.
        if (!activeDays.contains(cursor)) {
            return 0;
        }

        while (activeDays.contains(cursor)) {
            count++;
            cursor = cursor.minusDays(1);
        }
        return count;
    }

    private Set<LocalDate> activityDates(Long userId) {
        return activityRepository.findByUserId(userId).stream()
                .map(Activity::getActivityDate)
                .filter(date -> date != null)
                .collect(Collectors.toSet());
    }
}