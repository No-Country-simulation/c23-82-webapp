package org.nocountry.backend.mascercatuyo.Entities;

import jakarta.persistence.*;
import lombok.*;
import java.util.*;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ServicioSolicitado {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "id_servicio")
    private Servicio servicio;

    private String status;
    private Date fecha;
}
