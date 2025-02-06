package org.nocountry.backend.mascercatuyo.Controllers;

import org.nocountry.backend.mascercatuyo.DTOs.*;
import org.nocountry.backend.mascercatuyo.Entities.ServicioGeo;
import org.nocountry.backend.mascercatuyo.Entities.Usuario;
import org.nocountry.backend.mascercatuyo.Repositories.UsuarioRepository;
import org.nocountry.backend.mascercatuyo.Services.ServicioGeoService;
import org.nocountry.backend.mascercatuyo.utils.DistanceCalculator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/serviciosGeo")
public class ServicioGeoController
{
    private final ServicioGeoService servicioGeoService;
    private final UsuarioRepository usuarioRepository;

    public ServicioGeoController(ServicioGeoService servicioGeoService, UsuarioRepository usuarioRepository) {
        this.servicioGeoService = servicioGeoService;
        this.usuarioRepository = usuarioRepository;
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllGeoServices ()
    {
        try
        {
            List<ServicioGeo> servicioGeoList = servicioGeoService.findAll();

            if (servicioGeoList.isEmpty())
            {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            }

            return ResponseEntity.ok(servicioGeoList);
        }
        catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @CrossOrigin
    @PostMapping("/cliente")
    public ResponseEntity<?> createServicioSolicitante(@RequestBody ServicioSolicitanteGeoDTO dto)
    {
        try
        {
            ServicioGeo servicioGeo = convertToEntity(dto);

            servicioGeo.setFuente(FuenteServicio.SOLICITANTE);
            servicioGeoService.save(servicioGeo);

            return ResponseEntity.status(HttpStatus.CREATED).body(servicioGeo);
        }
        catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @CrossOrigin
    @PostMapping("/prestador")
    public ResponseEntity<?> createServicioPrestador(@RequestBody ServicioPrestadorGeoDTO dto) {
        try
        {
            ServicioGeo servicioGeo = convertToEntity(dto);

            servicioGeo.setFuente(FuenteServicio.PRESTADOR);
            servicioGeoService.save(servicioGeo);

            return ResponseEntity.status(HttpStatus.CREATED).body(servicioGeo);
        }
        catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    private ServicioGeo convertToEntity(ServicioSolicitanteGeoDTO dto) {
        return ServicioGeo.builder()
                .categoria(dto.getCategoria())
                .descripcion(dto.getDescripcion())
                .estado(dto.getEstado())
                .idUsuario(dto.getSolicitanteId())
                .latitude(dto.getLatitude())
                .longitude(dto.getLongitude())
                .build();
    }

    private ServicioGeo convertToEntity(ServicioPrestadorGeoDTO dto) {
        return ServicioGeo.builder()
                .categoria(dto.getCategoria())
                .descripcion(dto.getDescripcion())
                .estado(dto.getEstado())
                .tiempoEstimado(dto.getTiempoEstimado())
                .costo(dto.getCosto())
                .idUsuario(dto.getIdUsuario())
                .latitude(dto.getLatitude())
                .longitude(dto.getLongitude())
                .build();
    }

    @CrossOrigin
    @GetMapping("/categoriaGeo/{categoria}")
    public ResponseEntity<?> findAllByCategoria(@PathVariable String categoria)
    {
        try
        {
            List<ServicioGeo> servicioGeoList = servicioGeoService.findListaDeServiciosGeoByCategoria(categoria);

            if (servicioGeoList.isEmpty())
            {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            }

            List<ServicioSolicitarDTO> servicioSolicitarDTOS =
                    servicioGeoList.stream().map(this::convertServicioGeoToServicioSolicitarDTO).toList();

            return ResponseEntity.ok(servicioSolicitarDTOS);

        }
        catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getLocalizedMessage());
        }


    }

    @CrossOrigin
    @GetMapping("/{id}")
    public ServicioOfrecidoDTO getServicioGeoById(@PathVariable("id") Long id) {
        ServicioGeo servicioGeo = servicioGeoService.findById(id);

        return convertServicioGeoToServicioOfrecidoDTO(servicioGeo, id);
    }



    private ServicioSolicitarDTO convertServicioGeoToServicioSolicitarDTO(ServicioGeo servicioGeo) {
        String nombrePrestador = usuarioRepository.findById(servicioGeo.getIdUsuario())
                .map(Usuario::getNombreApellido)
                .orElse("Desconocido");

        return ServicioSolicitarDTO.builder()
                .servicioId(servicioGeo.getId())
                .categoria(servicioGeo.getCategoria())
                .nombrePrestador(nombrePrestador)
                .disponibilidad("disponible".equalsIgnoreCase(servicioGeo.getEstado()))
                .build();
    }

    private ServicioOfrecidoDTO convertServicioGeoToServicioOfrecidoDTO(ServicioGeo servicioGeo, Long id) {
        String nombrePrestador = usuarioRepository.findById(servicioGeo.getIdUsuario())
                .map(Usuario::getNombreApellido)
                .orElse("Desconocido");

        return ServicioOfrecidoDTO.builder()
                .categoria(servicioGeo.getCategoria())
                .descripcion(servicioGeo.getDescripcion())
                .estado(servicioGeo.getEstado())
                .tiempoEstimado(servicioGeo.getTiempoEstimado())
                .costo(servicioGeo.getCosto())
                .idUsuario(servicioGeo.getIdUsuario())
                .idServicio(id)
                .nombrePrestador(nombrePrestador)
                .latitude(servicioGeo.getLatitude())
                .longitude(servicioGeo.getLongitude())
                .disponibilidad("disponible".equalsIgnoreCase(servicioGeo.getEstado()))
                .build();
    }


    @GetMapping("/servicios-cercanos/{category}")
    public ResponseEntity<List<ServicioSolicitarDTO>> getNearbyServices(
            @RequestParam double userLat,
            @RequestParam double userLon,
            @RequestParam double radius,
            @PathVariable("category")String category)
    { // Radius in kilometers
        List<ServicioGeo> allServices = servicioGeoService.findListaDeServiciosGeoByCategoria(category);
        List<ServicioGeo> nearbyServices = new ArrayList<>();

        for (ServicioGeo service : allServices)
        {
            double distance = DistanceCalculator.calculateDistance(
                    userLat, userLon, service.getLatitude(), service.getLongitude());

            if (distance <= radius) {
                nearbyServices.add(service);
            }
        }

        //return ResponseEntity.ok(nearbyServices);

        List<ServicioSolicitarDTO> servicioSolicitarDTOS =
                nearbyServices.stream().map(this::convertServicioGeoToServicioSolicitarDTO).toList();

        return ResponseEntity.ok(servicioSolicitarDTOS);
    }





}



