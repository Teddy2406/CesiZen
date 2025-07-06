package com.CesiZen.CesiZen.service;


import com.CesiZen.CesiZen.mapper.RessourceMapper;
import com.CesiZen.CesiZen.model.RessourceEntity;
import com.CesiZen.CesiZen.repository.RessourceRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.openapitools.gen.dto.RessourceDto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RessourceServiceImpl implements RessourceService {


    private final RessourceRepository ressourceRepository;
    private final RessourceMapper ressourceMapper = new RessourceMapper();


    @Override
    public List<RessourceDto> getAllRessource() {
        List<RessourceEntity> ressourceEntityList = ressourceRepository.findAll();
        List<RessourceDto> ressourceDto = new ArrayList<>();

        for (RessourceEntity ressourceEntity : ressourceEntityList) {
            RessourceDto ressourcesDto = new RessourceDto()
                    .id(ressourceEntity.getId())
                    .titre(ressourceEntity.getTitre())
                    .description(ressourceEntity.getDescription())
                    .contenu(ressourceEntity.getContenu())
                    .theme(ressourceEntity.getTheme())
                    .tempsLecture(ressourceEntity.getTempsLecture());
            ressourceDto.add(ressourcesDto);
        }

        return ressourceDto;
    }

    @Override
    public Optional <RessourceDto> AddRessource(RessourceDto ressourceDto) {
        try {
            RessourceEntity ressourceEntity = new RessourceEntity(ressourceDto.getTitre(),ressourceDto.getDescription(),ressourceDto.getContenu(),ressourceDto.getTheme(),ressourceDto.getTempsLecture());
            return Optional.of(ressourceMapper.mapRessourceEntityToRessourceDto(ressourceRepository.save(ressourceEntity)));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    @Override
    public RessourceDto updateRessource(RessourceDto ressourceDto, Long id) {
        RessourceEntity ressourceEntity = ressourceRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Ressource not found"));

        if (Objects.nonNull(ressourceDto.getTitre())) {
            ressourceEntity.setTitre(ressourceDto.getTitre());
        }
        if (Objects.nonNull(ressourceDto.getDescription())) {
            ressourceEntity.setDescription(ressourceDto.getDescription());
        }
        if (Objects.nonNull(ressourceDto.getContenu())) {
            ressourceEntity.setContenu(ressourceDto.getContenu());
        }
        if (Objects.nonNull(ressourceDto.getTheme())) {
            ressourceEntity.setTheme(ressourceDto.getTheme());
        }
        if (Objects.nonNull(ressourceDto.getTempsLecture())) {
            ressourceEntity.setTempsLecture(ressourceDto.getTempsLecture());
        }
        RessourceEntity updatedRessourceEntity = ressourceRepository.save(ressourceEntity);
        return ressourceMapper.mapRessourceEntityToRessourceDto(updatedRessourceEntity);
    }


    @Override
    public void deleteRessourceById(Long id)
    {ressourceRepository.deleteById(id);}
}
