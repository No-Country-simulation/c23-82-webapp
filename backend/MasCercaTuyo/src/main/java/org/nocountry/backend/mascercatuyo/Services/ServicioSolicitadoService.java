package org.nocountry.backend.mascercatuyo.Services;

import org.nocountry.backend.mascercatuyo.Entities.Servicio;
import org.nocountry.backend.mascercatuyo.Entities.ServicioSolicitado;
import org.nocountry.backend.mascercatuyo.Repositories.ServicioRepository;
import org.nocountry.backend.mascercatuyo.Repositories.ServicioSolicitadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServicioSolicitadoService {

    @Autowired
    private ServicioSolicitadoRepository servicioSolicitadoRepository;

    public List<ServicioSolicitado> findAll() {
        return servicioSolicitadoRepository.findAll();
    }

    public Optional<ServicioSolicitado> findById(Long id) {
        return servicioSolicitadoRepository.findById(id);
    }

    public ServicioSolicitado save(ServicioSolicitado servicioSolicitado) {
        return servicioSolicitadoRepository.save(servicioSolicitado);
    }

    public void deleteById(Long id) {
        servicioSolicitadoRepository.deleteById(id);
    }
}
