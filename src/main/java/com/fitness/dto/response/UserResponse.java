package com.fitness.dto.response;

import com.fitness.entity.Role;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponse {

    private Long id;
    private String name;
    private String email;
    private Role role;
    private Integer age;
    private Double height;
    private Double weight;
}