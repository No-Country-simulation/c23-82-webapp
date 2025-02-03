package org.nocountry.backend.mascercatuyo.DTOs;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ServicioSolicitarDTO {
    private String categoria;
    private String nombrePrestador;

    @JsonIgnore
    private Boolean disponibilidad;
}
