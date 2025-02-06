package org.nocountry.backend.mascercatuyo.Services;

import org.nocountry.backend.mascercatuyo.DTOs.FuenteServicio;
import org.nocountry.backend.mascercatuyo.DTOs.ServicioSolicitarDTO;
import org.nocountry.backend.mascercatuyo.Entities.Servicio;
import org.nocountry.backend.mascercatuyo.Repositories.ServicioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServicioService {

    @Autowired
    private ServicioRepository servicioRepository;

    public List<Servicio> findAll() {
        return servicioRepository.findAll();
    }

    public Optional<Servicio> findById(Long id) {
        return servicioRepository.findById(id);
    }

    public Servicio save(Servicio servicio) {
        return servicioRepository.save(servicio);
    }

    public void deleteById(Long id) {
        servicioRepository.deleteById(id);
    }

    public List<Servicio> findByFuente(FuenteServicio fuente) {
        return servicioRepository.findByFuente(fuente);
    }

    public List<Servicio> findAllByCategoria(String categoria) {
        return servicioRepository.findListaDeServiciosByCategoria(categoria);
    }
}
