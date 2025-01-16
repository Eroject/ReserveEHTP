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
}