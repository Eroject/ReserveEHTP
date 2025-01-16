package com.ReserveEHTP.ReserveEHTP.Entities;

import jakarta.persistence.Entity;

@Entity
public class Admin extends Utilisateur {

    private String profession;

    public void ajouterClub(String clubName) {
        // Implémentation
    }

    public void supprimerDemande(Long demandeId) {
        // Implémentation
    }

    @Override
    public void login(String email, String motDePasse) {

    }

    // Autres méthodes spécifiques à Admin
}
