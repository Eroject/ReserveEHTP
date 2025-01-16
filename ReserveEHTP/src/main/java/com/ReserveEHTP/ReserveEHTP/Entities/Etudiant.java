package com.ReserveEHTP.ReserveEHTP.Entities;

import jakarta.persistence.*;
import java.util.List;
@Entity
public class Etudiant extends Demandeur {

    private String classe;

    @Override
    public List<Salle> afficherLocalDisponible() {
        // Implémentation spécifique pour les étudiants
        return null;
    }

    @Override
    public void login(String email, String motDePasse) {

    }

    public String getClasse() {
        return classe;
    }

    public void setClasse(String classe) {
        this.classe = classe;
    }
}
