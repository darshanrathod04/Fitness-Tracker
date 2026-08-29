package com.fitness.repository;

import com.fitness.entity.WeightLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface WeightLogRepository extends JpaRepository<WeightLog, Long> {

    List<WeightLog> findByUserIdOrderByLoggedDateAsc(Long userId);

    Optional<WeightLog> findTopByUserIdOrderByLoggedDateDescIdDesc(Long userId);

    Optional<WeightLog> findByIdAndUserId(Long id, Long userId);

    List<WeightLog> findByUserIdAndLoggedDateBetweenOrderByLoggedDateAsc(
            Long userId, LocalDate start, LocalDate end);
}