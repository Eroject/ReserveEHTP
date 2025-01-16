package com.ReserveEHTP.ReserveEHTP.Entities;

import jakarta.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Utilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String prenom;
    private String email;
    private String motDePasse;

    public abstract void login(String email, String motDePasse);

    public void logout() {
        // Implémentation de la déconnexion
    }
}
