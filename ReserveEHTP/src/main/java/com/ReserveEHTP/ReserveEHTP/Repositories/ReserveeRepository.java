package com.ReserveEHTP.ReserveEHTP.Repositories;

import com.ReserveEHTP.ReserveEHTP.Entities.Reservee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReserveeRepository extends JpaRepository<Reservee,Long> {
}
