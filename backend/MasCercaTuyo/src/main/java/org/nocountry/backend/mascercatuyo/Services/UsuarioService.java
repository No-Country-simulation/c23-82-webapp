package org.nocountry.backend.mascercatuyo.Services;

import org.nocountry.backend.mascercatuyo.DTOs.UsuarioDTO;
import org.nocountry.backend.mascercatuyo.Entities.TipoUsuario;
import org.nocountry.backend.mascercatuyo.Entities.Usuario;
import org.nocountry.backend.mascercatuyo.Repositories.TipoUsuarioRepository;
import org.nocountry.backend.mascercatuyo.Repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private TipoUsuarioRepository tipoUsuarioRepository;

    public List<UsuarioDTO> getAllUsuarios() {
        return usuarioRepository.findAll().stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public UsuarioDTO getUsuarioById(Long id) {
        Optional<Usuario> usuario = usuarioRepository.findById(id);
        return usuario.map(this::mapToDto).orElse(null);
    }

    public UsuarioDTO createUsuario(UsuarioDTO usuarioDto) {
        TipoUsuario tipoUsuario = tipoUsuarioRepository.findById(usuarioDto.getIdTipo())
                .orElseThrow(() -> new IllegalArgumentException("TipoUsuario con ID " + usuarioDto.getIdTipo() + " no encontrado."));

        Usuario usuario = mapToEntity(usuarioDto);
        usuario.setTipoUsuario(tipoUsuario);

        if (usuario.getId() != null) {
            throw new IllegalArgumentException("El ID debe ser nulo al crear un nuevo usuario.");
        }

        Usuario savedUsuario = usuarioRepository.save(usuario);

        if (savedUsuario.getId() == null) {
            throw new IllegalStateException("El ID del Usuario no fue generado correctamente.");
        }

        return mapToDto(savedUsuario);
    }


    public UsuarioDTO updateUsuario(Long id, UsuarioDTO usuarioDto) {
        // Buscar el usuario por ID
        Optional<Usuario> optionalUsuario = usuarioRepository.findById(id);

        if (optionalUsuario.isPresent()) {
            // Obtener el usuario existente
            Usuario usuario = optionalUsuario.get();

            // Asegurarse de que el ID no sea modificado
            if (!usuario.getId().equals(id)) {
                throw new IllegalArgumentException("El ID del usuario no coincide con el ID de la base de datos.");
            }

            // Actualizar los campos
            usuario.setNombreApellido(usuarioDto.getNombreApellido());
            usuario.setDomicilio(usuarioDto.getDomicilio());
            usuario.setTelefono(usuarioDto.getTelefono());

            // Asignar TipoUsuario
            TipoUsuario tipoUsuario = tipoUsuarioRepository.findById(usuarioDto.getIdTipo())
                    .orElseThrow(() -> new IllegalArgumentException("TipoUsuario con ID " + usuarioDto.getIdTipo() + " no encontrado."));
            usuario.setTipoUsuario(tipoUsuario);

            usuario.setAlias(usuarioDto.getAlias());
            usuario.setCorreo(usuarioDto.getCorreo());
            usuario.setFechaNacimiento(usuarioDto.getFechaNacimiento());
            usuario.setDisponibilidad(usuarioDto.getDisponibilidad());

            // Verificar que el ID se mantiene sin cambios
            if (usuario.getId() == null) {
                throw new IllegalArgumentException("El ID del usuario es nulo.");
            }

            // Guardar la entidad actualizada
            Usuario updatedUsuario = usuarioRepository.save(usuario);

            // Devolver el DTO actualizado
            return mapToDto(updatedUsuario);
        }

        // Si no se encuentra el usuario, lanzar una excepción
        throw new IllegalArgumentException("Usuario con ID " + id + " no encontrado.");
    }


    public void deleteUsuario(Long id) {
        usuarioRepository.deleteById(id);
    }

    private UsuarioDTO mapToDto(Usuario usuario) {
        UsuarioDTO dto = new UsuarioDTO();
        dto.setId(usuario.getId());
        dto.setNombreApellido(usuario.getNombreApellido());
        dto.setDomicilio(usuario.getDomicilio());
        dto.setTelefono(usuario.getTelefono());
        dto.setIdTipo(usuario.getTipoUsuario().getId());
        dto.setAlias(usuario.getAlias());
        dto.setCorreo(usuario.getCorreo());
        dto.setFechaNacimiento(usuario.getFechaNacimiento());
        dto.setDisponibilidad(usuario.getDisponibilidad());
        return dto;
    }

    private Usuario mapToEntity(UsuarioDTO dto) {
        Usuario usuario = new Usuario();
        usuario.setNombreApellido(dto.getNombreApellido());
        usuario.setDomicilio(dto.getDomicilio());
        usuario.setTelefono(dto.getTelefono());

        TipoUsuario tipoUsuario = new TipoUsuario();
        tipoUsuario.setId(dto.getIdTipo());
        usuario.setTipoUsuario(tipoUsuario);

        usuario.setAlias(dto.getAlias());
        usuario.setCorreo(dto.getCorreo());
        usuario.setFechaNacimiento(dto.getFechaNacimiento());
        usuario.setDisponibilidad(dto.getDisponibilidad());
        return usuario;
    }
}