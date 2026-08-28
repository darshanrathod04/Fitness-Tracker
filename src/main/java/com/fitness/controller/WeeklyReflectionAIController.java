package com.fitness.controller;

import com.fitness.dto.request.WeeklyReflectionRequest;
import com.fitness.dto.response.WeeklyReflectionResponse;
import com.fitness.service.WeeklyReflectionAIService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai/reflection")
public class WeeklyReflectionAIController {

    private final WeeklyReflectionAIService service;

    public WeeklyReflectionAIController(
            WeeklyReflectionAIService service
    ) {
        this.service = service;
    }

    @PostMapping
    public WeeklyReflectionResponse reflect(
            @Valid @RequestBody WeeklyReflectionRequest request
    ) {
        return service.reflect(request);
    }
}