package org.nocountry.backend.mascercatuyo.Controllers;

import org.nocountry.backend.mascercatuyo.DTOs.ServicioDTO;
import org.nocountry.backend.mascercatuyo.Entities.Servicio;
import org.nocountry.backend.mascercatuyo.Services.ServicioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/servicios")
public class ServicioController {

    @Autowired
    private ServicioService servicioService;

    @GetMapping
    public List<ServicioDTO> getAllServicios() {
        return servicioService.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ServicioDTO getServicioById(@PathVariable Long id) {
        Optional<Servicio> servicio = servicioService.findById(id);
        return servicio.map(this::convertToDTO).orElse(null);
    }

    @PostMapping
    public ServicioDTO createServicio(@RequestBody ServicioDTO servicioDTO) {
        Servicio servicio = convertToEntity(servicioDTO);
        Servicio savedServicio = servicioService.save(servicio);
        return convertToDTO(savedServicio);
    }

    @PutMapping("/{id}")
    public ServicioDTO updateServicio(@PathVariable Long id, @RequestBody ServicioDTO servicioDTO) {
        Servicio servicio = convertToEntity(servicioDTO);
        servicio.setId(id);
        Servicio updatedServicio = servicioService.save(servicio);
        return convertToDTO(updatedServicio);
    }

    @DeleteMapping("/{id}")
    public void deleteServicio(@PathVariable Long id) {
        servicioService.deleteById(id);
    }

    private ServicioDTO convertToDTO(Servicio servicio) {
        return ServicioDTO.builder()
                .id(servicio.getId())
                .nombreServicios(servicio.getNombreServicios())
                .costo(servicio.getCosto())
                .build();
    }

    private Servicio convertToEntity(ServicioDTO servicioDTO) {
        return Servicio.builder()
                .nombreServicios(servicioDTO.getNombreServicios())
                .costo(servicioDTO.getCosto())
                .build();
    }
}
