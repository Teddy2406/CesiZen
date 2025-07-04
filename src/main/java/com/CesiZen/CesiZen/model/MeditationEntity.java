package com.CesiZen.CesiZen.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

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

    @Column(length = 500)
    private String audioUrl;

    @Column(length = 500)
    private String image;

    // Tags stockés comme JSON ou chaîne séparée par des virgules
    @Column(columnDefinition = "TEXT")
    private String tags;

    // Benefits stockés comme JSON ou chaîne séparée par des virgules
    @Column(columnDefinition = "TEXT")
    private String benefits;

    // Constructeur personnalisé pour la création
    public MeditationEntity(String title, String description, String theme, Integer duration,
                            String difficulty, String instructor, String audioUrl, String image,
                            String tags, String benefits) {
        this.title = title;
        this.description = description;
        this.theme = theme;
        this.duration = duration;
        this.difficulty = difficulty;
        this.instructor = instructor;
        this.audioUrl = audioUrl;
        this.image = image;
        this.tags = tags;
        this.benefits = benefits;
    }

    // Méthodes utilitaires pour gérer les tags
    public List<String> getTagsList() {
        if (tags == null || tags.isEmpty()) {
            return List.of();
        }
        return List.of(tags.split(","));
    }

    public void setTagsList(List<String> tagsList) {
        if (tagsList == null || tagsList.isEmpty()) {
            this.tags = "";
        } else {
            this.tags = String.join(",", tagsList);
        }
    }

    // Méthodes utilitaires pour gérer les benefits
    public List<String> getBenefitsList() {
        if (benefits == null || benefits.isEmpty()) {
            return List.of();
        }
        return List.of(benefits.split(","));
    }

    public void setBenefitsList(List<String> benefitsList) {
        if (benefitsList == null || benefitsList.isEmpty()) {
            this.benefits = "";
        } else {
            this.benefits = String.join(",", benefitsList);
        }
    }

    // Méthode pour formater la durée en mm:ss
    public String getFormattedDuration() {
        if (duration == null) return "00:00";
        int minutes = duration;
        return String.format("%02d:00", minutes);
    }

    // Méthode pour vérifier si la méditation a un audio
    public boolean hasAudio() {
        return audioUrl != null && !audioUrl.trim().isEmpty();
    }

    // Méthode pour vérifier si la méditation a une image
    public boolean hasImage() {
        return image != null && !image.trim().isEmpty();
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