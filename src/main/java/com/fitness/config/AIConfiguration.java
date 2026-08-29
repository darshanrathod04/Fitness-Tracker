package com.fitness.config;

import com.shreeai.os.platform.sdk.ShreeAI;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AIConfiguration {

    @Bean
    public ShreeAI shreeAI() {
        return ShreeAI.builder()
                .apiKey("local")
                .build();
    }
}