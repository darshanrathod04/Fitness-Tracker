package com.fitness.controller;

import com.fitness.repository.ActivityRepository;
import com.fitness.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final UserRepository userRepository;
    private final ActivityRepository activityRepository;

    @GetMapping("/dashboard")
    public Map<String, Object> dashboard() {

        Map<String, Object> data = new HashMap<>();

        data.put("totalUsers", userRepository.count());
        data.put("totalActivities", activityRepository.count());

        return data;
    }
}