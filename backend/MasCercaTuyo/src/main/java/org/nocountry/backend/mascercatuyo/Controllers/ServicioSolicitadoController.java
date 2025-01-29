package org.nocountry.backend.mascercatuyo.Controllers;

import org.nocountry.backend.mascercatuyo.DTOs.ServicioSolicitadoDTO;
import org.nocountry.backend.mascercatuyo.Entities.Servicio;
import org.nocountry.backend.mascercatuyo.Entities.ServicioSolicitado;
import org.nocountry.backend.mascercatuyo.Entities.Usuario;
import org.nocountry.backend.mascercatuyo.Repositories.ServicioRepository;
import org.nocountry.backend.mascercatuyo.Repositories.UsuarioRepository;
import org.nocountry.backend.mascercatuyo.Services.ServicioSolicitadoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/serviciosSolicitados")
public class ServicioSolicitadoController {

    @Autowired
    private ServicioSolicitadoService servicioSolicitadoService;
    @Autowired
    private ServicioRepository servicioRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public List<ServicioSolicitadoDTO> getAllServiciosSolicitados() {
        return servicioSolicitadoService.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ServicioSolicitadoDTO getServicioById(@PathVariable Long id) {
        Optional<ServicioSolicitado> servicioSolicitado = servicioSolicitadoService.findById(id);
        return servicioSolicitado.map(this::convertToDTO).orElse(null);
    }

    @PostMapping
    public ServicioSolicitadoDTO createServicioSolicitado(@RequestBody ServicioSolicitadoDTO servicioSolicitadoDTO) {
        ServicioSolicitado servicioSolicitado = convertToEntity(servicioSolicitadoDTO);
        ServicioSolicitado savedServicio = servicioSolicitadoService.save(servicioSolicitado);
        return convertToDTO(savedServicio);
    }

    @PutMapping("/{id}")
    public ServicioSolicitadoDTO updateServicio(@PathVariable Long id, @RequestBody ServicioSolicitadoDTO servicioSolicitadoDTO) {
        ServicioSolicitado servicioSolicitado = convertToEntity(servicioSolicitadoDTO);
        servicioSolicitado.setId(id);
        ServicioSolicitado updatedServicio = servicioSolicitadoService.save(servicioSolicitado);
        return convertToDTO(updatedServicio);
    }

    @DeleteMapping("/{id}")
    public void deleteServicioSolicitado(@PathVariable Long id) {
        servicioSolicitadoService.deleteById(id);
    }

    private ServicioSolicitadoDTO convertToDTO(ServicioSolicitado servicioSolicitado) {
        return ServicioSolicitadoDTO.builder()
                .id(servicioSolicitado.getId())
                .idUsuario(servicioSolicitado.getUsuario().getId())
                .idServicio(servicioSolicitado.getServicio().getId())
                .status(servicioSolicitado.getStatus())
                .fecha(servicioSolicitado.getFecha())
                .build();
    }

    private ServicioSolicitado convertToEntity(ServicioSolicitadoDTO servicioSolicitadoDTO) {
        Usuario usuario = usuarioRepository.findById(servicioSolicitadoDTO.getIdUsuario())
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado con ID: " + servicioSolicitadoDTO.getIdUsuario()));
        Servicio servicio = servicioRepository.findById(servicioSolicitadoDTO.getIdServicio())
                .orElseThrow(() -> new IllegalArgumentException("Servicio no encontrado con ID: " + servicioSolicitadoDTO.getIdServicio()));

        return ServicioSolicitado.builder()
                .usuario(usuario)
                .servicio(servicio)
                .status(servicioSolicitadoDTO.getStatus())
                .fecha(servicioSolicitadoDTO.getFecha())
                .build();
    }
}
