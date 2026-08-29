package com.fitness.controller;

import com.fitness.dto.response.AIPlanHistoryResponse;
import com.fitness.repository.AIPlanHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/ai/plans")
@RequiredArgsConstructor
public class AIPlanHistoryController {

    private final AIPlanHistoryRepository repository;

    @GetMapping("/{userId}")
    public List<AIPlanHistoryResponse> history(
            @PathVariable Long userId) {

        return repository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(p -> new AIPlanHistoryResponse(
                        p.getVersion(),
                        p.getObjective(),
                        p.getConfidence(),
                        p.getCreatedAt()))
                .toList();
    }
}