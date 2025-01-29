package org.nocountry.backend.mascercatuyo.Controllers;

import org.nocountry.backend.mascercatuyo.DTOs.ServicioDTO;
import org.nocountry.backend.mascercatuyo.DTOs.ServicioPrestadorDTO;
import org.nocountry.backend.mascercatuyo.DTOs.ServicioSolicitanteDTO;
import org.nocountry.backend.mascercatuyo.Entities.Servicio;
import org.nocountry.backend.mascercatuyo.Services.ServicioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
        return servicioService.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServicioDTO> getServicioById(@PathVariable Long id) {
        Optional<Servicio> servicio = servicioService.findById(id);
        return servicio.map(value -> ResponseEntity.ok(convertToDTO(value)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/cliente")
    public ResponseEntity<ServicioSolicitanteDTO> createServicioSolicitante(@RequestBody ServicioSolicitanteDTO dto) {
        Servicio servicio = convertToEntity(dto);
        Servicio savedServicio = servicioService.save(servicio);
        return ResponseEntity.status(HttpStatus.CREATED).body(convertToClienteDTO(savedServicio));
    }

    @PostMapping("/prestador")
    public ResponseEntity<ServicioPrestadorDTO> createServicioPrestador(@RequestBody ServicioPrestadorDTO dto) {
        Servicio servicio = convertToEntity(dto);
        Servicio savedServicio = servicioService.save(servicio);
        return ResponseEntity.status(HttpStatus.CREATED).body(convertToPrestadorDTO(savedServicio));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ServicioDTO> updateServicio(@PathVariable Long id, @RequestBody ServicioDTO dto) {
        Optional<Servicio> existingServicio = servicioService.findById(id);
        if (existingServicio.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Servicio servicio = convertToEntity(dto);
        servicio.setId(id);
        Servicio updatedServicio = servicioService.save(servicio);
        return ResponseEntity.ok(convertToDTO(updatedServicio));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteServicio(@PathVariable Long id) {
        if (servicioService.findById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        servicioService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private Servicio convertToEntity(ServicioSolicitanteDTO dto) {
        return Servicio.builder()
                .categoria(dto.getCategoria())
                .descripcion(dto.getDescripcion())
                .estado(dto.getEstado())
                .build();
    }

    private Servicio convertToEntity(ServicioPrestadorDTO dto) {
        return Servicio.builder()
                .categoria(dto.getCategoria())
                .descripcion(dto.getDescripcion())
                .estado(dto.getEstado())
                .tiempoEstimado(dto.getTiempoEstimado())
                .costo(dto.getCosto())
                .build();
    }

    private ServicioSolicitanteDTO convertToClienteDTO(Servicio servicio) {
        return ServicioSolicitanteDTO.builder()
                .id(servicio.getId())
                .categoria(servicio.getCategoria())
                .descripcion(servicio.getDescripcion())
                .estado(servicio.getEstado())
                .build();
    }

    private ServicioPrestadorDTO convertToPrestadorDTO(Servicio servicio) {
        return ServicioPrestadorDTO.builder()
                .id(servicio.getId())
                .categoria(servicio.getCategoria())
                .descripcion(servicio.getDescripcion())
                .estado(servicio.getEstado())
                .tiempoEstimado(servicio.getTiempoEstimado())
                .costo(servicio.getCosto())
                .build();
    }

    private ServicioDTO convertToDTO(Servicio servicio) {
        return ServicioDTO.builder()
                .id(servicio.getId())
                .categoria(servicio.getCategoria())
                .descripcion(servicio.getDescripcion())
                .estado(servicio.getEstado())
                .tiempoEstimado(servicio.getTiempoEstimado())
                .costo(servicio.getCosto())
                .build();
    }

    private Servicio convertToEntity(ServicioDTO dto) {
        return Servicio.builder()
                .categoria(dto.getCategoria())
                .descripcion(dto.getDescripcion())
                .estado(dto.getEstado())
                .tiempoEstimado(dto.getTiempoEstimado())
                .costo(dto.getCosto())
                .build();
    }
}
