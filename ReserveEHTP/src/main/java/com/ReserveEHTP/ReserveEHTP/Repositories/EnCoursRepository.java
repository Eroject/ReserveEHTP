package com.ReserveEHTP.ReserveEHTP.Repositories;


import com.ReserveEHTP.ReserveEHTP.Entities.EnCours;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EnCoursRepository extends JpaRepository<EnCours,Long>
{
}
