package org.nocountry.backend.mascercatuyo.Repositories;


import org.nocountry.backend.mascercatuyo.Entities.ServicioGeo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServicioGeoRepository extends JpaRepository<ServicioGeo, Long>
{
    @Query("SELECT s FROM ServicioGeo s WHERE s.categoria = :categoria AND s.fuente = 'PRESTADOR'")
    List<ServicioGeo> findListaDeServiciosByCategoria(@Param("categoria") String categoria);

}
