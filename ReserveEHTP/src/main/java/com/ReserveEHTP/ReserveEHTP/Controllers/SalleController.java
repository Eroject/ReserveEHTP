package com.ReserveEHTP.ReserveEHTP.Controllers;

import ch.qos.logback.core.CoreConstants;
import com.ReserveEHTP.ReserveEHTP.Entities.Salle;
import com.ReserveEHTP.ReserveEHTP.Services.SalleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/salles")
public class SalleController {

    @Autowired
    private SalleService salleService;

    // API pour ajouter une salle
    @PostMapping("/ajouter-salle/")
    public ResponseEntity<Salle> ajouterSalle(@RequestBody Salle salle) {
        Salle nouvelleSalle = salleService.ajouterSalle(salle);
        System.out.println(salle.getDisponible());
        return new ResponseEntity<>(nouvelleSalle, HttpStatus.CREATED);
    }

    @GetMapping("/details-salle/{id}/")
    public Salle recupererSalle(@PathVariable Long id) {
        Salle salle = salleService.recupererSalle(id);
        return salle;
       /* if (salle != null) {
            System.out.println("yes");
            return new ResponseEntity<>(salle, HttpStatus.OK);
        } else {
System.out.println("no");
return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }*/
    }
}
