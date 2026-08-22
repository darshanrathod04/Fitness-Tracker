package com.fitness.config;

import io.swagger.v3.oas.models.*;
import io.swagger.v3.oas.models.info.*;
import io.swagger.v3.oas.models.security.*;
import org.springframework.context.annotation.*;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI fitnessOpenAPI() {

        final String securityScheme = "bearerAuth";

        return new OpenAPI()
                .info(new Info()
                        .title("Fitness Tracker API")
                        .description("Production Ready Spring Boot Fitness Tracker Backend")
                        .version("1.0.0"))

                .addSecurityItem(new SecurityRequirement()
                        .addList(securityScheme))

                .components(new Components()
                        .addSecuritySchemes(
                                securityScheme,
                                new SecurityScheme()
                                        .name(securityScheme)
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")
                        ));
    }
}