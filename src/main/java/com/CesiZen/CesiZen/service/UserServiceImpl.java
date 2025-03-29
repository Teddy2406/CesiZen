package com.CesiZen.CesiZen.service;

import com.CesiZen.CesiZen.mapper.UserMapper;
import com.CesiZen.CesiZen.model.UserEntity;
import com.CesiZen.CesiZen.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.openapitools.gen.dto.UserDto;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

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
        UserEntity userEntity = userRepository.findById(Math.toIntExact(id)).orElseThrow();
        UserDto userDto = new UserDto();
        if (Objects.nonNull(userDto.getUsername())) {
            userEntity.setUsername(userDto.getUsername());
        }
        if (Objects.nonNull(userDto.getRole())) {
            userEntity.setRole(userDto.getRole());
        }
        if (Objects.nonNull(userDto.getEmail())) {
            userEntity.setEmail(userDto.getEmail());
        }
        if (Objects.nonNull(userDto.getPhoneNumber())) {
            userEntity.setPhone_number(userDto.getPhoneNumber());
        }
        UserEntity updatedUserEntity = userRepository.save(userEntity);
        return userMapper.mapUserEntityToUserDto(updatedUserEntity) ;
    }
}
