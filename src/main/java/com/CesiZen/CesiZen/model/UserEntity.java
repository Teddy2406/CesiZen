package com.CesiZen.CesiZen.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Table(name = "user")
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String role;
    private String email;
    private String password;
    private String phone_number;



    public UserEntity(String username, String password, String role, String email, String phone_number) {
        this.username = username;
        this.role = role;
        this.email = email;
        this.password = password;
        this.phone_number = phone_number;
    }
}
