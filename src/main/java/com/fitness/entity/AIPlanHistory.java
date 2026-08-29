package com.fitness.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "ai_plan_history")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AIPlanHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private Integer version;

    @Column(length = 5000)
    private String objective;

    @Column(length = 10000)
    private String aiResponse;

    private Double confidence;

    private LocalDateTime createdAt;

    @PrePersist
    void created() {
        createdAt = LocalDateTime.now();
    }
}