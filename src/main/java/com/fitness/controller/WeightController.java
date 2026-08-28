package com.fitness.controller;

import com.fitness.dto.request.WeightLogRequest;
import com.fitness.dto.response.WeightLogResponse;
import com.fitness.entity.User;
import com.fitness.service.WeightService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/weight")
@RequiredArgsConstructor
public class WeightController {

    private final WeightService weightService;

    @PostMapping
    public WeightLogResponse addWeight(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody WeightLogRequest request) {
        return weightService.addWeight(user.getEmail(), request);
    }

    @GetMapping
    public List<WeightLogResponse> getHistory(@AuthenticationPrincipal User user) {
        return weightService.getHistory(user.getEmail());
    }

    @GetMapping("/latest")
    public WeightLogResponse getLatest(@AuthenticationPrincipal User user) {
        return weightService.getLatest(user.getEmail());
    }

    @DeleteMapping("/{id}")
    public String delete(
            @AuthenticationPrincipal User user,
            @PathVariable Long id) {
        weightService.delete(user.getEmail(), id);
        return "Weight entry deleted";
    }
}