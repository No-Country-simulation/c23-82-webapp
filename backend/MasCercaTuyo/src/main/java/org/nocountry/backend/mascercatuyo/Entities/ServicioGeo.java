package org.nocountry.backend.mascercatuyo.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.nocountry.backend.mascercatuyo.DTOs.FuenteServicio;

import java.math.BigDecimal;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ServicioGeo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String categoria;
    private String descripcion;
    private String estado;
    private Double tiempoEstimado;
    private BigDecimal costo;
    private Long idUsuario;

    @Enumerated(EnumType.STRING)
    private FuenteServicio fuente;

    private Double latitude;
    private Double longitude;
}
