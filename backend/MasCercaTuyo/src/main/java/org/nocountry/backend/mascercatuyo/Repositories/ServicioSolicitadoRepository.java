package org.nocountry.backend.mascercatuyo.Repositories;

import org.nocountry.backend.mascercatuyo.Entities.ServicioSolicitado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServicioSolicitadoRepository extends JpaRepository<ServicioSolicitado, Long> {
    // Por ejemplo, buscar por estado
    List<ServicioSolicitado> findByStatus(String status);
}
