package org.nocountry.backend.mascercatuyo.Entities;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;

import jakarta.persistence.*;
import lombok.*;
import org.nocountry.backend.mascercatuyo.DTOs.FuenteServicio;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Servicio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String categoria;
    private String descripcion;
    private String estado;
    private Double tiempoEstimado;
    private BigDecimal costo;
    private Long idUsuario;
    private String urlImagen;

    @Enumerated(EnumType.STRING)
    private FuenteServicio fuente;
}
