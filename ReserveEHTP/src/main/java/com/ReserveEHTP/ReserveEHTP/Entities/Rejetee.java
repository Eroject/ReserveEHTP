package com.ReserveEHTP.ReserveEHTP.Entities;

import jakarta.persistence.*;
import jakarta.persistence.OneToMany;

import java.util.Date;
import java.util.List;

@Entity
public class Rejetee implements EtatDemande {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Ajout d'un ID pour la persistance de l'entité

    private String motifRejet;
    private Date dateRejet;

    @OneToMany(mappedBy = "rejetee", cascade = CascadeType.ALL)
    private List<Demande> demandes;

    @Override
    public void traiter() {
        // Implémentation spécifique pour la demande rejetée
        // Par exemple : Enregistrement du motif de rejet, notification, etc.
    }
}
