package org.nocountry.backend.mascercatuyo.Repositories;

import org.nocountry.backend.mascercatuyo.DTOs.FuenteServicio;
import org.nocountry.backend.mascercatuyo.Entities.Servicio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ServicioRepository extends JpaRepository<Servicio, Long> {
    @Query("SELECT s FROM Servicio s WHERE s.categoria = :categoria AND s.fuente = 'PRESTADOR'")
    List<Servicio> findListaDeServiciosByCategoria(@Param("categoria") String categoria);

    List<Servicio> findByFuente(FuenteServicio fuente);
}
