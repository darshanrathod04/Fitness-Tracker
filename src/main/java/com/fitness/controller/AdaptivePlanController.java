package com.fitness.controller;

import com.fitness.dto.request.AdaptivePlanRequest;
import com.fitness.dto.response.AdaptivePlanResponse;
import com.fitness.service.AdaptivePlanService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ai/evolution")
@RequiredArgsConstructor
public class AdaptivePlanController {

    private final AdaptivePlanService service;

    @PostMapping
    public AdaptivePlanResponse evolve(
            @Valid @RequestBody AdaptivePlanRequest request){
        return service.evolve(request);
    }
}