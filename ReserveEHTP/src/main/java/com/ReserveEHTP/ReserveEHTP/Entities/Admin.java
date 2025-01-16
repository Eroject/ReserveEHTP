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

    public String getProfession() {
        return profession;
    }

    public void setProfession(String profession) {
        this.profession = profession;
    }
}
