package com.CesiZen.CesiZen.mapper;

import com.CesiZen.CesiZen.model.UserEntity;
import lombok.RequiredArgsConstructor;
import org.openapitools.gen.dto.UserDto;

@RequiredArgsConstructor
public class UserMapper {
    public UserDto mapUserEntityToUserDto(UserEntity userEntity) {
        return new UserDto()
                .userid(userEntity.getId())
                .username(userEntity.getUsername())
                .role(userEntity.getRole())
                .email(userEntity.getEmail())
                .password(userEntity.getPassword())
                .phoneNumber(userEntity.getPhone_number());
    }
}
