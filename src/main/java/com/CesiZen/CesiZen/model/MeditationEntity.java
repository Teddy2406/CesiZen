package com.CesiZen.CesiZen.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "meditation")
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class MeditationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 100)
    private String theme;

    @Column(nullable = false)
    private Integer duration;

    @Column(length = 20)
    private String difficulty;

    @Column(nullable = false, length = 255)
    private String instructor;

    // Constructeur personnalisé pour la création
    public MeditationEntity(String title, String description, String theme, Integer duration,
                            String difficulty, String instructor) {
        this.title = title;
        this.description = description;
        this.theme = theme;
        this.duration = duration;
        this.difficulty = difficulty;
        this.instructor = instructor;
    }

    // Validation des valeurs (peut être utilisée avec @PrePersist/@PreUpdate)
    @PrePersist
    @PreUpdate
    protected void validateData() {
        if (duration != null && duration < 1) {
            throw new IllegalArgumentException("La durée doit être positive");
        }
        if (title != null && title.trim().isEmpty()) {
            throw new IllegalArgumentException("Le titre ne peut pas être vide");
        }
        if (instructor != null && instructor.trim().isEmpty()) {
            throw new IllegalArgumentException("L'instructeur ne peut pas être vide");
        }
    }
}