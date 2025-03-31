package com.CesiZen.CesiZen.service;

import com.CesiZen.CesiZen.model.PasswordChangeEntity;
import com.CesiZen.CesiZen.repository.PasswordChangeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PasswordChangeServiceImpl {

    private final PasswordChangeRepository passwordChangeRepository;
    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public String generateResetToken(String email) {
        Optional<PasswordChangeEntity> userOpt = passwordChangeRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            throw new IllegalArgumentException("Aucun utilisateur trouvé avec cet email : " + email);
        }
        PasswordChangeEntity user = userOpt.get();

        String token = UUID.randomUUID().toString();
        LocalDateTime expiration = LocalDateTime.now().plusHours(1);

        user.setResetToken(token);
        user.setResetTokenExpiration(expiration);

        passwordChangeRepository.save(user);

        return token;
    }

    public void updatePassword(String token, String newPassword) {
        Optional<PasswordChangeEntity> userOpt = passwordChangeRepository.findByResetToken(token);
        if (userOpt.isEmpty()) {
            throw new IllegalArgumentException("Token invalide.");
        }
        PasswordChangeEntity user = userOpt.get();

        if (user.getResetTokenExpiration().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Le token a expiré.");
        }

        user.setPassword(encoder.encode(newPassword));

        user.setResetToken(null);
        user.setResetTokenExpiration(null);

        passwordChangeRepository.save(user);
    }
}
