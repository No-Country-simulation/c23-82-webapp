package org.nocountry.backend.mascercatuyo.Repositories;

import org.nocountry.backend.mascercatuyo.Entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findById(Long id);
    Optional<Usuario> findByCorreo(String correo);
}
