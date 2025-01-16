package com.ReserveEHTP.ReserveEHTP.Entities;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;


@Entity
public class Club extends Demandeur {

    private String nomClub;

    @Override
    public List<Salle> afficherLocalDisponible() {

        return null;
    }

    @Override
    public void login(String email, String motDePasse) {
    }

    public String getNomClub() {
        return nomClub;
    }

    public void setNomClub(String nomClub) {
        this.nomClub = nomClub;
    }
}
