package com.CesiZen.CesiZen.controller;

import lombok.RequiredArgsConstructor;
import org.openapitools.gen.api.MeditationApi;
import org.openapitools.gen.dto.MeditationDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:4200", "http://frontend:4200"})
public class MeditationController implements MeditationApi {
    @Override
    public ResponseEntity<MeditationDto> addMeditation(MeditationDto meditationDto) {
        return null;
    }

    @Override
    public ResponseEntity<Void> deleteMeditationById(Integer id) {
        return null;
    }

    @Override
    public ResponseEntity<List<MeditationDto>> getAllMeditation() {
        return null;
    }

    @Override
    public ResponseEntity<MeditationDto> updateMeditation(Integer id, MeditationDto meditationDto) {
        return null;
    }
}
