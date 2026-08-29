package com.fitness.repository;

import com.fitness.entity.Goal;
import com.fitness.entity.GoalStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GoalRepository extends JpaRepository<Goal, Long> {

    List<Goal> findByUserId(Long userId);

    Optional<Goal> findByIdAndUserId(Long id, Long userId);

    List<Goal> findByUserIdAndStatus(Long userId, GoalStatus status);

    long countByUserIdAndStatus(Long userId, GoalStatus status);
}