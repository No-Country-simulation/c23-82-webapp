package org.nocountry.backend.mascercatuyo.DTOs;

import lombok.*;
import java.util.*;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ServicioSolicitadoDTO {
    private Long id;
    private Long idUsuario;
    private Long idServicio;
    private String status;
    private Date fecha;
}
