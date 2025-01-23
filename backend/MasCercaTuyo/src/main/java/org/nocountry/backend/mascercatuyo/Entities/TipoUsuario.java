package org.nocountry.backend.mascercatuyo.Entities;

import jakarta.persistence.*;
import lombok.*;
import java.util.*;
import jakarta.persistence.*;
import lombok.*;
import java.util.*;

@Entity
@Data
@NoArgsConstructor
@Builder
@Table(name = "tipo_usuario")
public class TipoUsuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tipo;

    // Constructor para aceptar id y tipo, si no quieres usar el @AllArgsConstructor
    public TipoUsuario(Long id, String tipo) {
        this.id = id;
        this.tipo = tipo;
    }
}
