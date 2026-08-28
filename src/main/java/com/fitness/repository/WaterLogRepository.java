package com.fitness.repository;

import com.fitness.entity.WaterLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface WaterLogRepository extends JpaRepository<WaterLog, Long> {

    List<WaterLog> findByUserIdAndLoggedDateOrderByCreatedAtAsc(Long userId, LocalDate date);

    Optional<WaterLog> findByIdAndUserId(Long id, Long userId);

    List<WaterLog> findByUserIdAndLoggedDateBetween(Long userId, LocalDate start, LocalDate end);
}