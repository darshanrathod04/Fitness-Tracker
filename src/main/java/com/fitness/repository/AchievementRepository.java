package com.fitness.repository;

import com.fitness.entity.Achievement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AchievementRepository extends JpaRepository<Achievement, Long> {

    List<Achievement> findByUserIdOrderByEarnedAtDesc(Long userId);

    Optional<Achievement> findByUserIdAndCode(Long userId, String code);

    boolean existsByUserIdAndCode(Long userId, String code);
}