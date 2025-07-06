package com.CesiZen.CesiZen.mapper;

import com.CesiZen.CesiZen.model.RessourceEntity;
import org.openapitools.gen.dto.RessourceDto;


public class RessourceMapper {

    public RessourceDto mapRessourceEntityToRessourceDto(RessourceEntity ressourceEntity) {
        if (ressourceEntity == null) {
            return null;
        }
        RessourceDto ressourceDto = new RessourceDto();
        ressourceDto.id(ressourceEntity.getId());
        ressourceDto.titre(ressourceEntity.getTitre());
        ressourceDto.description(ressourceEntity.getDescription());
        ressourceDto.contenu(ressourceEntity.getContenu());
        ressourceDto.theme(ressourceEntity.getTheme());
        ressourceDto.setTempsLecture(ressourceEntity.getTempsLecture());


        return ressourceDto;
    }
}