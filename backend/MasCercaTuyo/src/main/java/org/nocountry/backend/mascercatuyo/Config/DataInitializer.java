package org.nocountry.backend.mascercatuyo.Config;

import org.nocountry.backend.mascercatuyo.Entities.TipoUsuario;
import org.nocountry.backend.mascercatuyo.Repositories.TipoUsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Autowired
    private TipoUsuarioRepository tipoUsuarioRepository;

    @Bean
    public CommandLineRunner loadData() {
        return args -> {
            try {
                // Verifica si ya existen los tipos de usuario, y si no, crea los nuevos
                if (tipoUsuarioRepository.findById(1L).isEmpty()) {
                    tipoUsuarioRepository.save(new TipoUsuario(null, "solicitante")); // ID será generado automáticamente
                }
                if (tipoUsuarioRepository.findById(2L).isEmpty()) {
                    tipoUsuarioRepository.save(new TipoUsuario(null, "proveedor")); // ID será generado automáticamente
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        };
    }
}