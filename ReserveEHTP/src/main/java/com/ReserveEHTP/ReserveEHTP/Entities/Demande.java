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

    public Demandeur getDemandeur() {
        return demandeur;
    }

    public void setDemandeur(Demandeur demandeur) {
        this.demandeur = demandeur;
    }

    public EnCours getEnCours() {
        return enCours;
    }

    public void setEnCours(EnCours enCours) {
        this.enCours = enCours;
    }

    public Reservee getReservee() {
        return reservee;
    }

    public void setReservee(Reservee reservee) {
        this.reservee = reservee;
    }

    public Rejetee getRejetee() {
        return rejetee;
    }

    public void setRejetee(Rejetee rejetee) {
        this.rejetee = rejetee;
    }

    public Salle getSalle() {
        return salle;
    }

    public void setSalle(Salle salle) {
        this.salle = salle;
    }

    public String getObjectif() {
        return objectif;
    }

    public void setObjectif(String objectif) {
        this.objectif = objectif;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getRaison() {
        return raison;
    }

    public void setRaison(String raison) {
        this.raison = raison;
    }

    public Date getDateReservation() {
        return dateReservation;
    }

    public void setDateReservation(Date dateReservation) {
        this.dateReservation = dateReservation;
    }

    public Date getDateDemande() {
        return dateDemande;
    }

    public void setDateDemande(Date dateDemande) {
        this.dateDemande = dateDemande;
    }

    public String getEtat() {
        return etat;
    }

    public void setEtat(String etat) {
        this.etat = etat;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}

