package com.CesiZen.CesiZen.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Table(name = "password_email")
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PasswordChangeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String password;
    private String resetToken;
    private LocalDateTime resetTokenExpiration;

    public PasswordChangeEntity(String email, String password, String resetToken, LocalDateTime resetTokenExpiration) {
        this.email = email;
        this.password = password;
        this.resetToken = resetToken;
        this.resetTokenExpiration = resetTokenExpiration;

    }
}
