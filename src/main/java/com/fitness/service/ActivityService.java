package com.fitness.service;


import com.fitness.dto.request.ActivityRequest;
import com.fitness.dto.response.ActivityResponse;
import com.fitness.entity.Activity;
import com.fitness.entity.User;
import com.fitness.repository.ActivityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ActivityService {

    private final ActivityRepository activityRepository;
    private final UserService userService;

    public ActivityResponse addActivity(String email, ActivityRequest request) {

        User user = userService.getByEmail(email);

        Activity activity = Activity.builder()
                .type(request.getType())
                .duration(request.getDuration())
                .calories(request.getCalories())
                .activityDate(request.getActivityDate())
                .user(user)
                .build();

        Activity saved = activityRepository.save(activity);

        return map(saved);
    }

    public List<ActivityResponse> getUserActivities(String email) {

        User user = userService.getByEmail(email);

        return activityRepository.findByUserId(user.getId())
                .stream()
                .map(this::map)
                .toList();
    }

    private ActivityResponse map(Activity activity) {

        return ActivityResponse.builder()
                .id(activity.getId())
                .type(activity.getType())
                .duration(activity.getDuration())
                .calories(activity.getCalories())
                .activityDate(activity.getActivityDate())
                .build();
    }
}