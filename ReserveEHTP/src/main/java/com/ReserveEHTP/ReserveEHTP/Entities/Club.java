package com.ReserveEHTP.ReserveEHTP.Entities;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Club extends Demandeur {

    private String nomClub;

    @Override
    public List<Salle> afficherLocalDisponible() {
        // Implémentation spécifique pour les clubs
        return null;
    }

   /* public void setNomClub(String nomClub) {
        this.nomClub = nomClub;
    }

    public String getNomClub() {
        return nomClub;
    }
*/
    @Override
    public void login(String email, String motDePasse) {

    }
}
