package com.ReserveEHTP.ReserveEHTP.Entities;

import java.util.Date;
import jakarta.persistence.*;
import lombok.Data;

// Entité Demande
@Data
@Entity
public class Demande {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String etat;
    private Date dateDemande;
    private Date dateReservation;
    private String raison;
    private String description;
    private String objectif;

    @ManyToOne
    @JoinColumn(name = "salle_id") // Clé étrangère vers Local/Salle
    private Salle salle;

    @ManyToOne
    @JoinColumn(name = "rejetee_id", nullable = true)
    private Rejetee rejetee;

    @ManyToOne
    @JoinColumn(name = "reservee_id", nullable = true)
    private Reservee reservee;

    @ManyToOne
    @JoinColumn(name = "enCours_id", nullable = true)
    private EnCours enCours;

    @ManyToOne
    @JoinColumn(name = "demandeur_id")
    private Demandeur demandeur; // Relation Many-to-One avec Demandeur

    public void traiter() {
        // Implémentation du traitement
    }
    public void setEtat(String etat) {
        this.etat = etat;
    }

}

