package com.CesiZen.CesiZen.service;

import com.CesiZen.CesiZen.mapper.MeditationMapper;
import com.CesiZen.CesiZen.model.MeditationEntity;
import com.CesiZen.CesiZen.repository.MeditationRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.openapitools.gen.dto.MeditationDto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MeditationServiceImpl implements MeditationService {


    private final MeditationRepository meditationRepository;
    private final MeditationMapper meditationMapper = new MeditationMapper();

    @Override
    public List<MeditationDto> getAllMeditations() {
        List<MeditationEntity> meditationEntityList = meditationRepository.findAll();
        List<MeditationDto> meditationDtoList = new ArrayList<>();

        for (MeditationEntity meditationEntity : meditationEntityList) {
            MeditationDto meditationDto = new MeditationDto()
                    .meditationId(meditationEntity.getId())
                    .title(meditationEntity.getTitle())
                    .description(meditationEntity.getDescription())
                    .theme(meditationEntity.getTheme())
                    .duration(meditationEntity.getDuration())
                    .difficulty(meditationEntity.getDifficulty())
                    .instructor(meditationEntity.getInstructor());
            meditationDtoList.add(meditationDto);
        }
        return meditationDtoList;
    }

    @Override
    public MeditationDto updateMeditation(Long id, MeditationDto meditationDto) {
        MeditationEntity meditationEntity = meditationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Meditation not found"));

        if (Objects.nonNull(meditationDto.getTitle())) {
            meditationEntity.setTitle(meditationDto.getTitle());
        }
        if (Objects.nonNull(meditationDto.getDescription())) {
            meditationEntity.setDescription(meditationDto.getDescription());
        }
        if (Objects.nonNull(meditationDto.getTheme())) {
            meditationEntity.setTheme(meditationDto.getTheme());
        }
        if (Objects.nonNull(meditationDto.getDuration())) {
            meditationEntity.setDuration(meditationDto.getDuration());
        }
        if (Objects.nonNull(meditationDto.getDifficulty())) {
            meditationEntity.setDifficulty(meditationDto.getDifficulty());
        }
        if (Objects.nonNull(meditationDto.getInstructor())) {
            meditationEntity.setInstructor(meditationDto.getInstructor());
        }
        MeditationEntity updateMeditationEntity = meditationRepository.save(meditationEntity);
        return meditationMapper.mapMeditationEntityToMeditationDto(updateMeditationEntity);
    }

    @Override
    public Optional<MeditationDto> AddMeditation(MeditationDto meditationDto) {
        try {
            MeditationEntity meditationEntity = new MeditationEntity(meditationDto.getTitle(),meditationDto.getDescription(),meditationDto.getTheme(),meditationDto.getDuration(),meditationDto.getDifficulty(),meditationDto.getInstructor());
            return Optional.of(meditationMapper.mapMeditationEntityToMeditationDto(meditationRepository.save(meditationEntity)));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    @Override
    public void deleteMeditationById(Long id) {
        meditationRepository.deleteById(id);
    }
}
