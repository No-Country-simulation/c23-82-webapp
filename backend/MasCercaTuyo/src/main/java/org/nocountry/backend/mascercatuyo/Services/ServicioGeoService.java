package org.nocountry.backend.mascercatuyo.Services;


import org.nocountry.backend.mascercatuyo.Entities.ServicioGeo;
import org.nocountry.backend.mascercatuyo.Repositories.ServicioGeoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ServicioGeoService
{
    private final ServicioGeoRepository servicioGeoRepository;

    public ServicioGeoService(ServicioGeoRepository servicioGeoRepository) {
        this.servicioGeoRepository = servicioGeoRepository;
    }


    @Transactional
    public ServicioGeo save(ServicioGeo servicio)
    {
        return servicioGeoRepository.save(servicio);
    }

    @Transactional(readOnly = true)
    public List<ServicioGeo> findListaDeServiciosGeoByCategoria(String categoria)
    {
        return servicioGeoRepository.findListaDeServiciosByCategoria(categoria);
    }

    @Transactional(readOnly = true)
    public ServicioGeo findById(Long id)
    {
        Optional<ServicioGeo> optionalServicioGeo = servicioGeoRepository.findById(id);

        if (optionalServicioGeo.isPresent()) {
            return optionalServicioGeo.get();
        }
        else
        {
            throw new RuntimeException("ServicioGeo not found with id: " + id);

        }
    }

    @Transactional(readOnly = true)
    public List<ServicioGeo> findAll()
    {
        return servicioGeoRepository.findAll();
    }
}
