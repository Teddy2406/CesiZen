package com.CesiZen.CesiZen.mapper;

import com.CesiZen.CesiZen.model.RespirationEntity;
import org.openapitools.gen.dto.RespirationDto;

public class RespirationMapper {

    public RespirationDto mapRespirationEntityToRessourceDto(RespirationEntity respirationEntity){
        if (respirationEntity == null) {
            return null;
        }
        RespirationDto respirationDto = new RespirationDto();
        respirationDto.respirationId(respirationEntity.getId());
        respirationDto.name(respirationEntity.getName());
        respirationDto.description(respirationEntity.getDescription());
        respirationDto.inhaleTime(respirationEntity.getInhaleTime());
        respirationDto.holdTime(respirationEntity.getHoldTime());
        respirationDto.exhaleTime(respirationEntity.getExhaleTime());
        respirationDto.cycles(respirationEntity.getCycles());
        respirationDto.duration(respirationEntity.getDuration());
        respirationDto.difficulty(respirationEntity.getDifficulty());

        return respirationDto;
    }
}
