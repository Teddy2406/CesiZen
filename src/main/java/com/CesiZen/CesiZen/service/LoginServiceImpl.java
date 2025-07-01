package com.CesiZen.CesiZen.service;

import com.CesiZen.CesiZen.model.UserEntity;
import com.CesiZen.CesiZen.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.openapitools.gen.dto.LoginDto;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginServiceImpl implements LoginService {

    private final JWTService jwtService;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;



    public String verify(UserEntity userEntity) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userEntity.getUsername(), userEntity.getPassword())
        );

        if (authentication.isAuthenticated()) {
            UserEntity user = userRepository.findByUsername(userEntity.getUsername());
            return jwtService.generateToken(user.getUsername(), user.getRole());
        } else {
            throw new BadCredentialsException("Invalid username or password");
        }
    }

}
