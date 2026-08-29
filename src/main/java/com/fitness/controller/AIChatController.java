package com.fitness.controller;

import com.fitness.dto.request.AIChatRequest;
import com.fitness.dto.response.AIChatResponse;
import com.fitness.service.AIChatService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai/chat")
public class AIChatController {

    private final AIChatService aiChatService;

    public AIChatController(AIChatService aiChatService) {
        this.aiChatService = aiChatService;
    }

    @PostMapping
    public AIChatResponse chat(
            @Valid @RequestBody AIChatRequest request
    ) {
        return aiChatService.chat(request.message());
    }
}