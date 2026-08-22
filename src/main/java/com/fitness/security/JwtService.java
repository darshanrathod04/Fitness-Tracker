package com.fitness.security;

import com.fitness.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expiration;

    public String generateToken(User user){

        return Jwts.builder()
                .subject(user.getEmail())
                .claim("role", user.getRole().name())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis()+expiration))
                .signWith(getKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractEmail(String token){

        return extractClaims(token).getSubject();
    }

    public boolean isValid(String token, User user){

        String email = extractEmail(token);

        return email.equals(user.getEmail())
                && !extractClaims(token).getExpiration().before(new Date());
    }

    private Claims extractClaims(String token){

        return Jwts.parser()
                .verifyWith((javax.crypto.SecretKey) getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private Key getKey(){

        byte[] key = Decoders.BASE64.decode(secret);

        return Keys.hmacShaKeyFor(key);
    }
}