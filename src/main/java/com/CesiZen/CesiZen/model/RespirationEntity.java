package com.CesiZen.CesiZen.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

@Table(name = "respiration")
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class RespirationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private Integer inhaleTime;

    @Column(nullable = false)
    private Integer holdTime;

    @Column(nullable = false)
    private Integer exhaleTime;

    @Column(nullable = false)
    private Integer cycles;

    @Column(nullable = false)
    private Integer duration;

    @Column(length = 20)
    private String difficulty;


    // Constructeur personnalisé pour la création
    public RespirationEntity(String name, String description, Integer inhaleTime,
                             Integer holdTime, Integer exhaleTime, Integer cycles,
                             Integer duration, String difficulty) {
        this.name = name;
        this.description = description;
        this.inhaleTime = inhaleTime;
        this.holdTime = holdTime;
        this.exhaleTime = exhaleTime;
        this.cycles = cycles;
        this.duration = duration;
        this.difficulty = difficulty;
    }



    // Méthode pour calculer le temps total d'un cycle en secondes
    public Integer getCycleDurationInSeconds() {
        return inhaleTime + holdTime + exhaleTime;
    }

    // Méthode pour calculer le temps total de l'exercice en secondes
    public Integer getTotalDurationInSeconds() {
        return getCycleDurationInSeconds() * cycles;
    }

    // Validation des valeurs (peut être utilisée avec @PrePersist/@PreUpdate)
    @PrePersist
    @PreUpdate
    protected void validateData() {
        if (inhaleTime != null && inhaleTime < 1) {
            throw new IllegalArgumentException("Le temps d'inspiration doit être positif");
        }
        if (holdTime != null && holdTime < 0) {
            throw new IllegalArgumentException("Le temps de rétention ne peut pas être négatif");
        }
        if (exhaleTime != null && exhaleTime < 1) {
            throw new IllegalArgumentException("Le temps d'expiration doit être positif");
        }
        if (cycles != null && cycles < 1) {
            throw new IllegalArgumentException("Le nombre de cycles doit être positif");
        }
        if (duration != null && duration < 1) {
            throw new IllegalArgumentException("La durée doit être positive");
        }
    }
}