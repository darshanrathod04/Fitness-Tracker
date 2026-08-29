package com.fitness.service;

import com.fitness.dto.ai.MemoryContext;
import com.fitness.entity.AIGoal;
import com.fitness.repository.AIGoalRepository;
import com.fitness.repository.AIPlanHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MemoryContextService {

    private final AIGoalRepository goalRepository;
    private final AIPlanHistoryRepository historyRepository;

    public MemoryContext load(Long userId){

        AIGoal goal = goalRepository.findByUserId(userId)
                .orElseThrow();

        List<String> recentPlans = historyRepository
                .findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .limit(3)
                .map(p -> p.getObjective())
                .toList();

        return new MemoryContext(
                goal.getGoal(),
                goal.getExperience(),
                goal.getTargetCalories(),
                goal.getTargetProtein(),
                (int) historyRepository.countByUserId(userId),
                recentPlans
        );
    }
}