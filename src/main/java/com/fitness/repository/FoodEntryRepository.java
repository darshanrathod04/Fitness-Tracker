package com.fitness.repository;

import com.fitness.entity.FoodEntry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface FoodEntryRepository extends JpaRepository<FoodEntry, Long> {

    List<FoodEntry> findByUserIdAndLoggedDateOrderByCreatedAtAsc(Long userId, LocalDate date);

    Optional<FoodEntry> findByIdAndUserId(Long id, Long userId);

    List<FoodEntry> findByUserIdAndLoggedDateBetween(Long userId, LocalDate start, LocalDate end);
}