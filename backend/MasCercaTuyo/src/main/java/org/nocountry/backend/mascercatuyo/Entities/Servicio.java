package org.nocountry.backend.mascercatuyo.Entities;

import jakarta.persistence.*;
import lombok.*;
import java.util.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Servicio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombreServicios;
    private Double costo;

    @OneToMany(mappedBy = "servicio", cascade = CascadeType.ALL)
    private List<ServicioSolicitado> serviciosSolicitados;
}
