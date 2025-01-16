package com.ReserveEHTP.ReserveEHTP.Entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data // Génère automatiquement getters, setters, toString, equals, hashCode
@NoArgsConstructor // Génère un constructeur sans arguments
public class Salle implements Local { // Salle hérite de Local

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String typeLocal;
    private Boolean disponible;
    private String departement;
    private int nombrePlaces;

    @ElementCollection
    private List<String> equipements;

    @OneToMany(mappedBy = "salle", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Demande> demandes; // Un Local peut avoir plusieurs Demandes

    @Override
    public void selectionnerLocal() {

    }
}