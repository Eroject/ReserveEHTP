package com.ReserveEHTP.ReserveEHTP.Entities;
import jakarta.persistence.*;
import java.util.List;

@Entity
public class Club extends Demandeur {

    private String nomClub;

    @Override
    public List<Salle> afficherLocalDisponible() {
        // Implémentation spécifique pour les clubs
        return null;
    }

    @Override
    public void login(String email, String motDePasse) {

    }
}
