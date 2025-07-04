package com.CesiZen.CesiZen.service;

import lombok.RequiredArgsConstructor;
import org.openapitools.gen.dto.MeditationDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MeditationServiceImpl implements MeditationService {

    @Override
    public List<MeditationDto> getAllMeditations() {
        return List.of();
    }

    @Override
    public MeditationDto updateMeditation(Long id, MeditationDto meditationDto) {
        return null;
    }

    @Override
    public Optional<MeditationDto> AddMeditation(MeditationDto meditationDto) {
        return Optional.empty();
    }

    @Override
    public void deleteMeditationById(Long id) {

    }
}
