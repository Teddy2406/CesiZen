package com.CesiZen.CesiZen.controller;

import com.CesiZen.CesiZen.model.UserEntity;
import com.CesiZen.CesiZen.service.UserService;
import com.CesiZen.CesiZen.service.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.openapitools.gen.api.UserApi;
import org.openapitools.gen.dto.UserDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:4200", "http://frontend:4200"})
public class UserController implements UserApi {

    private final UserService userService;
    private final UserServiceImpl userServiceImpl;



    @PostMapping("/register")
    public UserEntity register(@RequestBody UserEntity userEntity) {
        return userServiceImpl.register(userEntity);
    }

    @PostMapping("/login")
    public String login(@RequestBody UserEntity userEntity) {
        return userServiceImpl.verify(userEntity);
    }

    @Override
    public ResponseEntity<List<UserDto>> getAllUser() {return ResponseEntity.ok(userService.getAllUser());
    }

    @Override
    public ResponseEntity<UserDto> updateUser(@PathVariable Integer id) {
        return ResponseEntity.ok(userService.updateUser(id.longValue()));
    }
}
