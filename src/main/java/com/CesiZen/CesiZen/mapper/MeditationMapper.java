package com.CesiZen.CesiZen.mapper;

import com.CesiZen.CesiZen.model.MeditationEntity;
import org.openapitools.gen.dto.MeditationDto;

public class MeditationMapper {

    public MeditationDto mapMeditationEntityToMeditationDto(MeditationEntity meditationEntity) {
        if (meditationEntity == null) {
            return null;
        }
        MeditationDto meditationDto = new MeditationDto();
        meditationDto.meditationId(meditationDto.getMeditationId());
        meditationDto.title(meditationEntity.getTitle());
        meditationDto.description(meditationEntity.getDescription());
        meditationDto.theme(meditationEntity.getTheme());
        meditationDto.duration(meditationEntity.getDuration());
        meditationDto.difficulty(meditationEntity.getDifficulty());
        meditationDto.instructor(meditationEntity.getInstructor());

        return meditationDto;
    }
}
