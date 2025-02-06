package org.nocountry.backend.mascercatuyo.Services;

import org.nocountry.backend.mascercatuyo.Entities.Usuario;
import org.nocountry.backend.mascercatuyo.Repositories.UsuarioRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    private final UsuarioRepository usuarioRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public boolean autenticarUsuario(String correo, String contrasena) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByCorreo(correo);
        return usuarioOpt.isPresent() && passwordEncoder.matches(contrasena, usuarioOpt.get().getContrasena());
    }
}
