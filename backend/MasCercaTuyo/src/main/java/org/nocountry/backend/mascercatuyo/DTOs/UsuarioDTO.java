package org.nocountry.backend.mascercatuyo.DTOs;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import java.util.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsuarioDTO {
    private Long id;
    private String nombreApellido;
    private String domicilio;
    private String telefono;
    private Long idTipo;
    private String alias;
    private String correo;
    private Date fechaNacimiento;
    private Boolean disponibilidad;
}
