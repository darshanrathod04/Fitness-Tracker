package com.fitness.service;

import com.fitness.dto.response.AIChatResponse;
import com.shreeai.os.platform.sdk.SDKResponse;
import com.shreeai.os.platform.sdk.ShreeAI;
import org.springframework.stereotype.Service;

@Service
public class AIChatService {

    private final ShreeAI shreeAI;

    public AIChatService(ShreeAI shreeAI) {
        this.shreeAI = shreeAI;
    }

    public AIChatResponse chat(String message) {

        SDKResponse response = shreeAI.chat(message);

        return new AIChatResponse(
                response.answer(),
                response.confidence()
        );
    }
}