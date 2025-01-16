package com.ReserveEHTP.ReserveEHTP.Repositories;

import com.ReserveEHTP.ReserveEHTP.Entities.Salle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SalleRepository extends JpaRepository<Salle,Long> {
}
