package com.fitness.repository;

import com.fitness.entity.Activity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ActivityRepository extends JpaRepository<Activity, Long> {

    List<Activity> findByUserId(Long userId);

    List<Activity> findByType(String type);

    List<Activity> findByActivityDate(LocalDate activityDate);

    List<Activity> findByUserIdAndType(Long userId, String type);

    List<Activity> findByUserIdAndActivityDateBetween(
            Long userId, LocalDate start, LocalDate end);
}