package org.nocountry.backend.mascercatuyo.DTOs;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ServicioSolicitanteGeoDTO {
    private Long id;
    private String categoria;
    private String descripcion;
    private String estado;
    private Long solicitanteId;

    private Double latitude;
    private Double longitude;

}
