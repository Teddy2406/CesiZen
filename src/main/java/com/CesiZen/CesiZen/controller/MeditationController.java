package com.CesiZen.CesiZen.controller;

import com.CesiZen.CesiZen.service.MeditationService;
import lombok.RequiredArgsConstructor;
import org.openapitools.gen.api.MeditationApi;
import org.openapitools.gen.dto.MeditationDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:4200", "http://frontend:4200", "http://localhost:8082"})
public class MeditationController implements MeditationApi {

    private final MeditationService meditationService;

    @Override
    public ResponseEntity<MeditationDto> addMeditation(@RequestBody MeditationDto meditationDto) {
        Optional<MeditationDto> meditation = meditationService.AddMeditation(meditationDto);
        if (meditation.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().body(meditation.get());
    }

    @Override
    public ResponseEntity<Void> deleteMeditationById(Integer id) {
        meditationService.deleteMeditationById(Long.valueOf(id));
        return ResponseEntity.noContent().build();
    }

    @Override
    public ResponseEntity<List<MeditationDto>> getAllMeditation() {
        return ResponseEntity.ok(meditationService.getAllMeditations());
    }

    @Override
    public ResponseEntity<MeditationDto> updateMeditation(@PathVariable Integer id,@RequestBody MeditationDto meditationDto) {
        return ResponseEntity.ok(meditationService.updateMeditation(id.longValue(), meditationDto));
    }
}
