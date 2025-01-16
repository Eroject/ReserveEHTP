package com.ReserveEHTP.ReserveEHTP.Controllers;

import com.ReserveEHTP.ReserveEHTP.Entities.Demande;
import com.ReserveEHTP.ReserveEHTP.Services.DemandeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/demandes")
public class DemandeController {

    @Autowired
    private DemandeService demandeService;

    // API pour changer l'état d'une demande
    @PostMapping("/changer-disponibilite/{id}")
    public ResponseEntity<Demande> changerDisponibilite(
            @PathVariable Long id,
            @RequestParam String nouvelEtat) {

        // Appeler le service pour mettre à jour l'état de la demande
        Demande demandeMiseAJour = demandeService.changerDisponibilite(id, nouvelEtat);

        if (demandeMiseAJour != null) {
            return new ResponseEntity<>(demandeMiseAJour, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
