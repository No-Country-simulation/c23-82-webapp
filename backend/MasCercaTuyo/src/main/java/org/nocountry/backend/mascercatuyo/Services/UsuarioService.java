package org.nocountry.backend.mascercatuyo.Services;

import org.nocountry.backend.mascercatuyo.DTOs.UsuarioDTO;
import org.nocountry.backend.mascercatuyo.Entities.Usuario;
import org.nocountry.backend.mascercatuyo.Repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<UsuarioDTO> getAllUsuarios() {
        return usuarioRepository.findAll().stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public UsuarioDTO getUsuarioById(Long id) {
        Optional<Usuario> usuario = usuarioRepository.findById(id);
        return usuario.map(this::mapToDto).orElse(null);
    }

    public UsuarioDTO createUsuario(UsuarioDTO usuarioDto) {
        Usuario usuario = mapToEntity(usuarioDto);

        if (usuario.getId() != null) {
            throw new IllegalArgumentException("El ID debe ser nulo al crear un nuevo usuario.");
        }

        usuario.setContrasena(passwordEncoder.encode(usuarioDto.getContraseña()));

        Usuario savedUsuario = usuarioRepository.save(usuario);
        if (savedUsuario.getId() == null) {
            throw new IllegalStateException("El ID del Usuario no fue generado correctamente.");
        }

        return mapToDto(savedUsuario);
    }


    public UsuarioDTO updateUsuario(Long id, UsuarioDTO usuarioDto) {
        Optional<Usuario> optionalUsuario = usuarioRepository.findById(id);

        if (optionalUsuario.isPresent()) {
            Usuario usuario = optionalUsuario.get();

            if (!usuario.getId().equals(id)) {
                throw new IllegalArgumentException("El ID del usuario no coincide con el ID de la base de datos.");
            }

            usuario.setNombreApellido(usuarioDto.getNombreApellido());
            usuario.setDomicilio(usuarioDto.getDomicilio());
            usuario.setAlias(usuarioDto.getAlias());
            usuario.setCorreo(usuarioDto.getCorreo());
            usuario.setFechaNacimiento(usuarioDto.getFechaNacimiento());
            usuario.setDisponibilidad(usuarioDto.getDisponibilidad());
            usuario.setImagen(usuarioDto.getImagen());

            if (usuario.getId() == null) {
                throw new IllegalArgumentException("El ID del usuario es nulo.");
            }

            Usuario updatedUsuario = usuarioRepository.save(usuario);
            return mapToDto(updatedUsuario);
        }

        throw new IllegalArgumentException("Usuario con ID " + id + " no encontrado.");
    }


    public void deleteUsuario(Long id) {
        if (usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);
        }
    }

    private UsuarioDTO mapToDto(Usuario usuario) {
        UsuarioDTO dto = new UsuarioDTO();
        dto.setId(usuario.getId());
        dto.setNombreApellido(usuario.getNombreApellido());
        dto.setDomicilio(usuario.getDomicilio());
        dto.setAlias(usuario.getAlias());
        dto.setCorreo(usuario.getCorreo());
        dto.setFechaNacimiento(usuario.getFechaNacimiento());
        dto.setDisponibilidad(usuario.getDisponibilidad());
        dto.setImagen(usuario.getImagen());
        return dto;
    }

    private Usuario mapToEntity(UsuarioDTO dto) {
        Usuario usuario = new Usuario();
        usuario.setNombreApellido(dto.getNombreApellido());
        usuario.setDomicilio(dto.getDomicilio());
        usuario.setAlias(dto.getAlias());
        usuario.setCorreo(dto.getCorreo());
        usuario.setFechaNacimiento(dto.getFechaNacimiento());
        usuario.setDisponibilidad(dto.getDisponibilidad());

        if (dto.getContraseña() != null) {
            usuario.setContrasena(passwordEncoder.encode(dto.getContraseña()));
        }

        return usuario;
    }
}