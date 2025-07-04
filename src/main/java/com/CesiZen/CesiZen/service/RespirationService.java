package com.CesiZen.CesiZen.service;

import org.openapitools.gen.dto.RespirationDto;

import java.util.List;
import java.util.Optional;

public interface RespirationService {
    List<RespirationDto> getAllRespiration();
    Optional<RespirationDto> AddRespiration(RespirationDto respirationDto);
    RespirationDto updateRespiration(RespirationDto respirationDto, Long id);
    void deleteRespirationById(Long id);
}
