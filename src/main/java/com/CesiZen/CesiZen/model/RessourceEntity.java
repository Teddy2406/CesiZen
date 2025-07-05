package com.CesiZen.CesiZen.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;

@Table(name = "ressources")
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class RessourceEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String titre;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String contenu;

    @Column(length = 100)
    private String theme;

    @Column(nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime datePublication;

    @Column(length = 100)
    private String tempsLecture;

    // Constructeur personnalisé pour la création

    public RessourceEntity(String titre, String description, String contenu, String theme, String tempsLecture) {
        this.titre = titre;
        this.description = description;
        this.contenu = contenu;
        this.theme = theme;
        this.datePublication = LocalDateTime.now();
        this.tempsLecture = tempsLecture;
    }
    // Méthode pour définir automatiquement la date de publication
    @PrePersist
    protected void onCreate() {
        if (datePublication == null) {
            datePublication = LocalDateTime.now();
        }
    }
}