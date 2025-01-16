
package com.ReserveEHTP.ReserveEHTP.Services;

import com.ReserveEHTP.ReserveEHTP.Entities.Demande;
import com.ReserveEHTP.ReserveEHTP.Repositories.DemandeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DemandeService {

    @Autowired
    private DemandeRepository demandeRepository;

    public Demande changerDisponibilite(Long id, String nouvelEtat) {
        Optional<Demande> demandeOptional = demandeRepository.findById(id);

        if (demandeOptional.isPresent()) {
            Demande demande = demandeOptional.get();
            demande.setEtat(nouvelEtat); // Modifier l'état
            return demandeRepository.save(demande); // Sauvegarder la demande mise à jour
        } else {
            return null; // Retourner null si la demande n'est pas trouvée
        }
    }
}
