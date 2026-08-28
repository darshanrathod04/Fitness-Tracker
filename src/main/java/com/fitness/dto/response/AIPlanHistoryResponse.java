package com.fitness.dto.response;

import java.time.LocalDateTime;

public record AIPlanHistoryResponse(

        Integer version,
        String objective,
        Double confidence,
        LocalDateTime createdAt
) {}