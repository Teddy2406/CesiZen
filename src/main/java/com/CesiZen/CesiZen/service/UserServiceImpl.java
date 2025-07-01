package com.CesiZen.CesiZen.service;

import com.CesiZen.CesiZen.mapper.UserMapper;
import com.CesiZen.CesiZen.model.UserEntity;
import com.CesiZen.CesiZen.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.openapitools.gen.dto.UserDto;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {


    private final UserRepository userRepository;
    private final JWTService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserMapper userMapper = new UserMapper();
    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();




    public UserEntity register(UserEntity user) {
        user.setPassword(encoder.encode(user.getPassword()));
        user.setRole("Utilisateur");
        return userRepository.save(user);
    }

    public String verify(UserEntity userEntity) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userEntity.getUsername(), userEntity.getPassword())
        );

        if (authentication.isAuthenticated()) {
            UserEntity user = userRepository.findByUsername(userEntity.getUsername());
            return jwtService.generateToken(user.getUsername(), user.getRole());
        }
        return "Fail";
    }

    @Override
    public List<UserDto> getAllUser() {
        List<UserEntity> userEntityList = userRepository.findAll();
        List<UserDto> userDto = new ArrayList<>();

        for (UserEntity userEntity : userEntityList) {
            UserDto usersDto = new UserDto()
                    .userid(userEntity.getId())
                    .username(userEntity.getUsername())
                    .role(userEntity.getRole())
                    .email(userEntity.getEmail())
                    .password(userEntity.getPassword())
                    .phoneNumber(userEntity.getPhone_number());
            userDto.add(usersDto);
        }

        return userDto;
    }

    @Override
    public UserDto updateUser(Long id) {
        Optional<UserEntity> optionalUserEntity = userRepository.findById(id);

        if (optionalUserEntity.isPresent()) {
            UserEntity userEntity = optionalUserEntity.get();

            UserEntity updatedUserEntity = userRepository.save(userEntity);

            UserDto userDto = new UserDto()
                    .userid(updatedUserEntity.getId())
                    .username(updatedUserEntity.getUsername())
                    .role(updatedUserEntity.getRole())
                    .email(updatedUserEntity.getEmail())
                    .password(updatedUserEntity.getPassword())
                    .phoneNumber(updatedUserEntity.getPhone_number());

            return userDto;
        } else {
            throw new EntityNotFoundException("UserEntity not found for id: " + id);
        }
    }

    @Override
    public UserDto getUserById(Long id) {
        System.out.println("=== DEBUG getUserById ===");
        System.out.println("ID recherché: " + id);

        Optional<UserEntity> verfiUserEntity = userRepository.findById(id);
        System.out.println("Optional présent? " + verfiUserEntity.isPresent());

        if (verfiUserEntity.isPresent()) {
            UserEntity userEntity = verfiUserEntity.get();
            System.out.println("Utilisateur trouvé: " + userEntity.getUsername());

            UserDto userDto = new UserDto()
                    .userid(userEntity.getId())
                    .username(userEntity.getUsername())
                    .role(userEntity.getRole())
                    .email(userEntity.getEmail())
                    .password(userEntity.getPassword())
                    .phoneNumber(userEntity.getPhone_number());

            System.out.println("UserDto créé avec username: " + userDto.getUsername());
            return userDto;
        } else {
            System.out.println("Utilisateur non trouvé!");
            throw new EntityNotFoundException("UserEntity not found for id: " + id);
        }
    }

    public String changePassword(String oldPassword, String newPassword) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            throw new IllegalStateException("Aucun utilisateur n'est actuellement authentifié.");
        }

        String username = authentication.getName();

        UserEntity user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("Aucun utilisateur trouvé pour le nom : " + username);
        }

        if (!encoder.matches(oldPassword, user.getPassword())) {
            throw new IllegalArgumentException("L'ancien mot de passe est incorrect.");
        }

        user.setPassword(encoder.encode(newPassword));
        userRepository.save(user);

        return "Mot de passe modifié avec succès !";
    }
}



