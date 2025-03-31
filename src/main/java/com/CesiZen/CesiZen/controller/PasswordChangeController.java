package com.CesiZen.CesiZen.controller;

import com.CesiZen.CesiZen.service.PasswordChangeServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:4200", "http://frontend:4200"})
public class PasswordChangeController {

    private final PasswordChangeServiceImpl passwordChangeServiceImpl;

    @PostMapping("/generate-email")
    public ResponseEntity<?> generateToken(@RequestParam String email) {
        try {
            String token = passwordChangeServiceImpl.generateResetToken(email);
            return ResponseEntity.ok("Votre lien de réinitialisation est : " + token);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/update-password")
    public ResponseEntity<?> updatePassword(
            @RequestParam String token,
            @RequestParam String newPassword) {
        try {
            passwordChangeServiceImpl.updatePassword(token, newPassword);
            return ResponseEntity.ok("Mot de passe mis à jour avec succès !");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
