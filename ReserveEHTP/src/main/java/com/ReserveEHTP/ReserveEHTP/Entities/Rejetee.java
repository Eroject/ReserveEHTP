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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMotifRejet() {
        return motifRejet;
    }

    public void setMotifRejet(String motifRejet) {
        this.motifRejet = motifRejet;
    }

    public Date getDateRejet() {
        return dateRejet;
    }

    public void setDateRejet(Date dateRejet) {
        this.dateRejet = dateRejet;
    }

    public List<Demande> getDemandes() {
        return demandes;
    }

    public void setDemandes(List<Demande> demandes) {
        this.demandes = demandes;
    }
}
