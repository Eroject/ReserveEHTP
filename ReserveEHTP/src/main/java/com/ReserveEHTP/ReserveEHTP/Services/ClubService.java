package com.ReserveEHTP.ReserveEHTP.Services;

import com.ReserveEHTP.ReserveEHTP.Entities.Club;
import com.ReserveEHTP.ReserveEHTP.Repositories.ClubRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClubService {

    @Autowired
    private ClubRepository clubRepository;

    public Club ajouterClub(Club club) {
        return clubRepository.save(club); // Sauvegarde du club dans la base de données
    }
}
