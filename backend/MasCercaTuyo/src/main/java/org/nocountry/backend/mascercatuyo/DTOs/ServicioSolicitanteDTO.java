package org.nocountry.backend.mascercatuyo.DTOs;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ServicioSolicitanteDTO {
    private Long id;
    private String categoria;
    private String descripcion;
    private String estado;
}
