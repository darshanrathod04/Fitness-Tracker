package com.fitness.service;

import com.fitness.dto.request.WeightLogRequest;
import com.fitness.dto.response.WeightLogResponse;
import com.fitness.entity.User;
import com.fitness.entity.WeightLog;
import com.fitness.repository.WeightLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WeightService {

    private static final double DEFAULT_HEIGHT_CM = 170.0;

    private final UserService userService;
    private final WeightLogRepository weightLogRepository;

    public WeightLogResponse addWeight(String email, WeightLogRequest request) {
        User user = userService.getByEmail(email);
        LocalDate date = request.getLoggedDate() != null
                ? request.getLoggedDate() : LocalDate.now();

        WeightLog log = WeightLog.builder()
                .weightKg(request.getWeightKg())
                .bmi(computeBmi(request.getWeightKg(), heightCm(user)))
                .note(request.getNote())
                .loggedDate(date)
                .user(user)
                .build();

        return toResponse(weightLogRepository.save(log));
    }

    public List<WeightLogResponse> getHistory(String email) {
        User user = userService.getByEmail(email);
        return weightLogRepository.findByUserIdOrderByLoggedDateAsc(user.getId())
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public WeightLogResponse getLatest(String email) {
        User user = userService.getByEmail(email);
        WeightLog latest = weightLogRepository
                .findTopByUserIdOrderByLoggedDateDescIdDesc(user.getId())
                .orElseThrow(() -> new RuntimeException("No weight logged yet"));
        return toResponse(latest);
    }

    public void delete(String email, Long id) {
        User user = userService.getByEmail(email);
        WeightLog log = weightLogRepository.findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new RuntimeException("Weight entry not found"));
        weightLogRepository.delete(log);
    }

    private double heightCm(User user) {
        return user.getHeight() != null
                ? user.getHeight() : DEFAULT_HEIGHT_CM;
    }

    private double computeBmi(double weightKg, double heightCm) {
        if (heightCm <= 0) {
            return 0;
        }
        double m = heightCm / 100.0;
        return Math.round(weightKg / (m * m) * 10.0) / 10.0;
    }

    private WeightLogResponse toResponse(WeightLog log) {
        return WeightLogResponse.builder()
                .id(log.getId())
                .weightKg(log.getWeightKg())
                .bmi(log.getBmi())
                .note(log.getNote())
                .loggedDate(log.getLoggedDate())
                .build();
    }
}