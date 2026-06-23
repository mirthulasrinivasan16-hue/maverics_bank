package com.bank.utility;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtility {

    private static final String SECRET_KEY =
            "MAVERICSBANKJWTSECRETKEY123456789123456789123456789123456789";

    private final SecretKey secretKey =
            Keys.hmacShaKeyFor(
                    Decoders.BASE64.decode(
                            java.util.Base64.getEncoder()
                                    .encodeToString(
                                            SECRET_KEY.getBytes()
                                    )
                    )
            );

    public String generateToken(
            String username){

        Map<String,Object> claims =
                new HashMap<>();

        return createToken(
                claims,
                username);
    }

    private String createToken(
            Map<String,Object> claims,
            String username){

        return Jwts.builder()
                .claims(claims)
                .subject(username)
                .issuedAt(
                        new Date(
                                System.currentTimeMillis()
                        ))
                .expiration(
                        new Date(
                                System.currentTimeMillis()
                                        + 86400000
                        ))
                .signWith(
                        secretKey,
                        Jwts.SIG.HS256
                )
                .compact();
    }

    public Boolean validateToken(
            String token,
            String username){

        final String extractedUsername =
                extractUsername(token);

        return extractedUsername
                .equals(username)
                &&
                !isTokenExpired(token);
    }

    public String extractUsername(
            String token){

        return extractClaim(
                token,
                Claims::getSubject);
    }

    private Boolean isTokenExpired(
            String token){

        return extractExpiration(token)
                .before(new Date());
    }

    private Date extractExpiration(
            String token){

        return extractClaim(
                token,
                Claims::getExpiration);
    }

    public <T> T extractClaim(
            String token,
            Function<Claims,T> resolver){

        Claims claims =
                extractAllClaims(token);

        return resolver.apply(claims);
    }

    private Claims extractAllClaims(
            String token){

        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}