package com.ReserveEHTP.ReserveEHTP.Entities;

import jakarta.persistence.*;

import java.util.List;

// Entité EnCours
@Entity
public class EnCours  implements EtatDemande {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Ajout d'un ID pour la persistance de l'entité

    @OneToMany(mappedBy = "enCours", cascade = CascadeType.ALL)
    private List<Demande> demandes;

    @Override
    public void traiter() {
        // Implémentation spécifique pour la demande en cours
        // Par exemple : Vérification de la disponibilité de la salle, etc.
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Demande> getDemandes() {
        return demandes;
    }

    public void setDemandes(List<Demande> demandes) {
        this.demandes = demandes;
    }
}


