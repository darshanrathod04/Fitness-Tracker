package com.fitness.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "weight_logs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WeightLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "weight_kg", nullable = false)
    private Double weightKg;

    private Double bmi;

    private String note;

    @Column(name = "logged_date")
    private LocalDate loggedDate;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
        if (loggedDate == null) {
            loggedDate = LocalDate.now();
        }
    }
}