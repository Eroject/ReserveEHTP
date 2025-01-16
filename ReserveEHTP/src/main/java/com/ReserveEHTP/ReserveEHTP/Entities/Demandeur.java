package com.ReserveEHTP.ReserveEHTP.Entities;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Demandeur extends Utilisateur {

    @OneToMany(mappedBy = "demandeur")
    private List<Demande> demandes; // Un Demandeur peut avoir plusieurs Demandes

    public abstract List<Salle> afficherLocalDisponible();
}
