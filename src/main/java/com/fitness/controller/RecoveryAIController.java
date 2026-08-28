package com.fitness.controller;

import com.fitness.dto.request.RecoveryRequest;
import com.fitness.dto.response.RecoveryResponse;
import com.fitness.service.RecoveryAIService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai/recovery")
public class RecoveryAIController {

    private final RecoveryAIService recoveryAIService;

    public RecoveryAIController(RecoveryAIService recoveryAIService) {
        this.recoveryAIService = recoveryAIService;
    }

    @PostMapping
    public RecoveryResponse analyze(
            @Valid @RequestBody RecoveryRequest request
    ) {
        return recoveryAIService.analyzeRecovery(request);
    }
}