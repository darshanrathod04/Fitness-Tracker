package com.fitness.repository;

import com.fitness.entity.AIGoal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AIGoalRepository extends JpaRepository<AIGoal, Long> {

    Optional<AIGoal> findByUserId(Long userId);
}