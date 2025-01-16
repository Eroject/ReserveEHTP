package com.ReserveEHTP.ReserveEHTP.Repositories;

import com.ReserveEHTP.ReserveEHTP.Entities.Rejetee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RejeteeRepository extends JpaRepository<Rejetee,Long> {
}
