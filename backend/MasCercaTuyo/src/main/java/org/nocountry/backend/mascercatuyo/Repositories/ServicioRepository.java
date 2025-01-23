package org.nocountry.backend.mascercatuyo.Repositories;

import org.nocountry.backend.mascercatuyo.Entities.Servicio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServicioRepository extends JpaRepository<Servicio, Long> {
    // Métodos personalizados, si es necesario
}
