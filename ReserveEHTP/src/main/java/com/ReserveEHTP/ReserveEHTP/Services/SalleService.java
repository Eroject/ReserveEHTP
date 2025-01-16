package com.ReserveEHTP.ReserveEHTP.Services;

import com.ReserveEHTP.ReserveEHTP.Entities.Salle;
import com.ReserveEHTP.ReserveEHTP.Repositories.SalleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SalleService {

    @Autowired
    private SalleRepository salleRepository;

    // Méthode pour ajouter une salle
    public Salle ajouterSalle(Salle salle) {
        return salleRepository.save(salle); // Enregistre la salle en base de données
    }

    // Méthode pour récupérer les détails d'une salle par son ID
    public Salle recupererSalle(Long id) {
        return salleRepository.findById(id).orElse(null); // Récupère la salle par son ID, ou retourne null si non trouvée
    }
}
