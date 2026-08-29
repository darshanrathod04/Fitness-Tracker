package com.fitness.service;

import com.fitness.dto.request.AIGoalRequest;
import com.fitness.dto.response.AIGoalResponse;
import com.fitness.entity.AIGoal;
import com.fitness.entity.User;
import com.fitness.repository.AIGoalRepository;
import com.fitness.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AIGoalService {

    private final AIGoalRepository goalRepository;
    private final UserRepository userRepository;

    public AIGoalResponse saveGoal(Long userId, AIGoalRequest request) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        AIGoal goal = goalRepository.findByUserId(userId)
                .orElse(AIGoal.builder().user(user).build());

        goal.setGoal(request.goal());
        goal.setExperience(request.experience());
        goal.setTargetCalories(request.targetCalories());
        goal.setTargetProtein(request.targetProtein());

        AIGoal saved = goalRepository.save(goal);

        return map(saved);
    }

    public AIGoalResponse getGoal(Long userId) {

        AIGoal goal = goalRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("AI Goal not found"));

        return map(goal);
    }

    private AIGoalResponse map(AIGoal goal) {
        return new AIGoalResponse(
                goal.getId(),
                goal.getGoal(),
                goal.getExperience(),
                goal.getTargetCalories(),
                goal.getTargetProtein()
        );
    }
}