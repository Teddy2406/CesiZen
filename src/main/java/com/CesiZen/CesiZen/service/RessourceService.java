package com.CesiZen.CesiZen.service;

import org.openapitools.gen.dto.RessourceDto;

import java.util.List;
import java.util.Optional;

public interface RessourceService {
    List<RessourceDto> getAllRessource();
    Optional<RessourceDto> AddRessource(RessourceDto ressource);
    RessourceDto updateRessource(RessourceDto ressourceDto, Long id);
    void deleteRessourceById(Long id);
}
