package com.CesiZen.CesiZen.service;

import com.CesiZen.CesiZen.mapper.RespirationMapper;
import com.CesiZen.CesiZen.model.RespirationEntity;
import com.CesiZen.CesiZen.repository.RespirationRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.openapitools.gen.dto.RespirationDto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RespirationServiceImpl implements RespirationService {

    private final RespirationMapper respirationMapper = new RespirationMapper();
    private final RespirationRepository respirationRepository;


    @Override
    public List<RespirationDto> getAllRespiration() {
        List<RespirationEntity> respirationEntityList = respirationRepository.findAll();
        List<RespirationDto> respirationDto = new ArrayList<>();

        for (RespirationEntity respirationEntity : respirationEntityList) {
            RespirationDto respirationsDto = new RespirationDto()
                    .respirationId(respirationEntity.getId())
                    .name(respirationEntity.getName())
                    .description(respirationEntity.getDescription())
                    .inhaleTime(respirationEntity.getInhaleTime())
                    .holdTime(respirationEntity.getHoldTime())
                    .exhaleTime(respirationEntity.getExhaleTime())
                    .cycles(respirationEntity.getCycles())
                    .duration(respirationEntity.getDuration())
                    .difficulty(respirationEntity.getDifficulty());
            respirationDto.add(respirationsDto);
        }
        return respirationDto;
    }

    @Override
    public Optional<RespirationDto> AddRespiration(RespirationDto respirationDto) {
        try {
            RespirationEntity respirationEntity = new RespirationEntity(respirationDto.getName(), respirationDto.getDescription(),respirationDto.getInhaleTime(),respirationDto.getHoldTime(),respirationDto.getExhaleTime(),respirationDto.getCycles(),respirationDto.getDuration(), respirationDto.getDifficulty());
            return Optional.of(respirationMapper.mapRespirationEntityToRessourceDto(respirationRepository.save(respirationEntity)));
        }catch (Exception e){
            return Optional.empty();
        }
    }

    @Override
    public RespirationDto updateRespiration(RespirationDto respirationDto, Long id) {
        RespirationEntity respirationEntity = respirationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Respiration not found"));
        if (Objects.nonNull(respirationDto.getName())){
            respirationEntity.setName(respirationDto.getName());
        }
        if (Objects.nonNull(respirationDto.getDescription())){
            respirationEntity.setDescription(respirationDto.getDescription());
        }
        if (Objects.nonNull(respirationDto.getInhaleTime())){
            respirationEntity.setInhaleTime(respirationDto.getInhaleTime());
        }
        if (Objects.nonNull(respirationDto.getHoldTime())){
            respirationEntity.setHoldTime(respirationDto.getHoldTime());
        }
        if (Objects.nonNull(respirationDto.getExhaleTime())){
            respirationEntity.setExhaleTime(respirationDto.getExhaleTime());
        }
        if (Objects.nonNull(respirationDto.getCycles())){
            respirationEntity.setCycles(respirationDto.getCycles());
        }
        if (Objects.nonNull(respirationDto.getDuration())){
            respirationEntity.setDuration(respirationDto.getDuration());
        }
        if (Objects.nonNull(respirationDto.getDifficulty())){
            respirationEntity.setDifficulty(respirationDto.getDifficulty());
        }
        RespirationEntity updatedRespirationEntity = respirationRepository.save(respirationEntity);
        return respirationMapper.mapRespirationEntityToRessourceDto(updatedRespirationEntity);
    }

    @Override
    public void deleteRespirationById(Long id)
    {respirationRepository.deleteById(id);}

}

