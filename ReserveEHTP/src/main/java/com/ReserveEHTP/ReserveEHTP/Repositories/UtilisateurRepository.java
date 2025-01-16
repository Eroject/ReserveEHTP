package com.ReserveEHTP.ReserveEHTP.Repositories;

import com.ReserveEHTP.ReserveEHTP.Entities.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur,Long> {
}
