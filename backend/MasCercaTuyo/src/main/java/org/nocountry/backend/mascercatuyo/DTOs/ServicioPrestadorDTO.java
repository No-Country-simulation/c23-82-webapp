package org.nocountry.backend.mascercatuyo.DTOs;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;
import org.nocountry.backend.mascercatuyo.Entities.Usuario;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ServicioPrestadorDTO {
    private Long id;
    private String categoria;
    private String descripcion;
    private String estado;
    private Double tiempoEstimado;
    @NotNull(message = "El costo del servicio no puede ser nulo")
    @Positive(message = "El costo del servicio debe ser un valor positivo")
    @Column(precision = 10, scale = 2, nullable = false)
    private BigDecimal costo;
    private Long idUsuario; //TODO: agregar usuario en el servicio del prestador
}
