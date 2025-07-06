package com.CesiZen.CesiZen.service;

import org.openapitools.gen.dto.MeditationDto;

import java.util.List;
import java.util.Optional;

public interface MeditationService {
    List<MeditationDto> getAllMeditations();
    MeditationDto updateMeditation(Long id, MeditationDto meditationDto);
    Optional<MeditationDto> AddMeditation(MeditationDto meditationDto);
    void deleteMeditationById(Long id);
}
