package com.CesiZen.CesiZen.service;

import org.openapitools.gen.dto.UserDto;

import java.util.List;

public interface UserService {
    List<UserDto> getAllUser();
    UserDto updateUser(Long id);

    UserDto getUserById(Long id);
}
