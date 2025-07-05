package com.CesiZen.CesiZen.controller;

import com.CesiZen.CesiZen.service.RessourceService;
import com.CesiZen.CesiZen.service.RessourceServiceImpl;
import lombok.RequiredArgsConstructor;
import org.openapitools.gen.api.RessourceApi;
import org.openapitools.gen.dto.RessourceDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:4200", "http://frontend:4200"})
public class RessourceController implements RessourceApi {

    private final RessourceService ressourceService;

    @Override
    public ResponseEntity<RessourceDto> addRessource(@RequestBody RessourceDto ressourceDto) {
        Optional<RessourceDto> ressource = ressourceService.AddRessource(ressourceDto);
        if (ressource.isEmpty()) {
            return  ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().body(ressource.get());
    }

    @Override
    public ResponseEntity<Void> deleteRessourceById(Integer id) {
        ressourceService.deleteRessourceById(Long.valueOf(id));
        return ResponseEntity.noContent().build();
    }

    @Override
    public ResponseEntity<List<RessourceDto>> getAllRessource() {
        return ResponseEntity.ok(ressourceService.getAllRessource());
    }

    @Override
    public ResponseEntity<RessourceDto> updateRessource(@PathVariable Integer id, @RequestBody RessourceDto ressourceDto) {
        return ResponseEntity.ok(ressourceService.updateRessource(ressourceDto, id.longValue()));
    }
}
