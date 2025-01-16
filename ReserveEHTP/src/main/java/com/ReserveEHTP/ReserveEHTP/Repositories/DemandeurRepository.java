package com.ReserveEHTP.ReserveEHTP.Repositories;

import com.ReserveEHTP.ReserveEHTP.Entities.Demandeur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DemandeurRepository extends JpaRepository<Demandeur,Long> {
}
