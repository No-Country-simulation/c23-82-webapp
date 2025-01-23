package org.nocountry.backend.mascercatuyo.DTOs;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ServicioDTO {
    private Long id;
    private String nombreServicios;
    private Double costo;
}
