package com.ReserveEHTP.ReserveEHTP.Entities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Reservee implements EtatDemande {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Ajout d'un ID pour la persistance de l'entité

    private int duree;

    @OneToMany(mappedBy = "reservee", cascade = CascadeType.ALL)
    private List<Demande> demandes;

    @Override
    public void traiter() {
        // Implémentation spécifique pour la demande réservée
        // Par exemple : Mise à jour de l'état de la demande, notification, etc.
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getDuree() {
        return duree;
    }

    public void setDuree(int duree) {
        this.duree = duree;
    }

    public List<Demande> getDemandes() {
        return demandes;
    }

    public void setDemandes(List<Demande> demandes) {
        this.demandes = demandes;
    }
}