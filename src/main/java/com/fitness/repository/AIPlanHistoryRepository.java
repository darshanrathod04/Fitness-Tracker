package com.fitness.repository;

import com.fitness.entity.AIPlanHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AIPlanHistoryRepository
        extends JpaRepository<AIPlanHistory, Long> {

    List<AIPlanHistory> findByUserIdOrderByCreatedAtDesc(Long userId);

    long countByUserId(Long userId);
}