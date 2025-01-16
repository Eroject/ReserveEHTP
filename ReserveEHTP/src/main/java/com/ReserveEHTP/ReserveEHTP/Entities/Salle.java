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

    public Boolean getDisponible() {
        return disponible;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDepartement() {
        return departement;
    }

    public void setDepartement(String departement) {
        this.departement = departement;
    }

    public int getNombrePlaces() {
        return nombrePlaces;
    }

    public void setNombrePlaces(int nombrePlaces) {
        this.nombrePlaces = nombrePlaces;
    }

    public List<String> getEquipements() {
        return equipements;
    }

    public void setEquipements(List<String> equipements) {
        this.equipements = equipements;
    }

    public List<Demande> getDemandes() {
        return demandes;
    }

    public void setDemandes(List<Demande> demandes) {
        this.demandes = demandes;
    }

    @Override
    public void selectionnerLocal() {

    }
}