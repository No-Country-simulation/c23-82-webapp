package org.nocountry.backend.mascercatuyo.DTOs;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ServicioDTO {
    private Long id;
    private String categoria;
    private String descripcion;
    private String estado;
    private Double tiempoEstimado;
    private String urlImagen;
    @NotNull(message = "El costo del servicio no puede ser nulo")
    @Positive(message = "El costo del servicio debe ser un valor positivo")
    @Column(precision = 10, scale = 2, nullable = false)
    private BigDecimal costo;
    private Long idUsuario;
}
