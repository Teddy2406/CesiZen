package com.CesiZen.CesiZen.controller;

import com.CesiZen.CesiZen.service.RespirationService;
import lombok.RequiredArgsConstructor;
import org.openapitools.gen.api.RespirationApi;
import org.openapitools.gen.dto.RespirationDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:4200", "http://frontend:4200","http://localhost:8082"})
public class RespirationController implements RespirationApi {

    private final RespirationService respirationService;

    @Override
    public ResponseEntity<RespirationDto> addRespiration(@RequestBody RespirationDto respirationDto) {
        Optional<RespirationDto> respiration = respirationService.AddRespiration(respirationDto);
        if (respiration.isEmpty()){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(respiration.get());
    }

    @Override
    public ResponseEntity<Void> deleteRespirationById(Integer id) {
        respirationService.deleteRespirationById(Long.valueOf(id));
        return ResponseEntity.noContent().build();
    }

    @Override
    public ResponseEntity<List<RespirationDto>> getAllRRespiration() {
        return ResponseEntity.ok(respirationService.getAllRespiration());
    }

    @Override
    public ResponseEntity<RespirationDto> updateRespiration(@PathVariable Integer id, @RequestBody RespirationDto respirationDto) {
        return ResponseEntity.ok(respirationService.updateRespiration(respirationDto, id.longValue()));
    }
}
