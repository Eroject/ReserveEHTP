package com.ReserveEHTP.ReserveEHTP.Controllers;

import com.ReserveEHTP.ReserveEHTP.Entities.Club;
import com.ReserveEHTP.ReserveEHTP.Services.ClubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/utilisateurs/clubs")
public class ClubController {

    @Autowired
    private ClubService clubService;

    @PostMapping("/addClub")
    public ResponseEntity<Club> ajouterClub(@RequestBody Club club) {
        Club nouveauClub = clubService.ajouterClub(club);
        return ResponseEntity.ok(nouveauClub);
    }
}
