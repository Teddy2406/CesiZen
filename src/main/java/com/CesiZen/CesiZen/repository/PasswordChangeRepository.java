package com.CesiZen.CesiZen.repository;

import com.CesiZen.CesiZen.model.PasswordChangeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PasswordChangeRepository extends JpaRepository<PasswordChangeEntity, Long> {

    Optional<PasswordChangeEntity> findByEmail(String email);

    Optional<PasswordChangeEntity> findByResetToken(String token);
}
