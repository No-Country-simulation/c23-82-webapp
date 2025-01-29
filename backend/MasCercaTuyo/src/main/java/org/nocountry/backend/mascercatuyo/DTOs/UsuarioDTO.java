package org.nocountry.backend.mascercatuyo.DTOs;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.nocountry.backend.mascercatuyo.Config.FechaNacimientoValida;

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
    private String alias;
    @NotBlank(message = "El email no puede estar vacío")
    @Email(message = "El email debe ser valido")
    @Column(unique = true)
    private String correo;
    @NotBlank
    @Size(min = 5, message = "La contraseña debe ser de al menos 5 caracteres")
    private String contraseña;
    @FechaNacimientoValida
    private Date fechaNacimiento;
    private Boolean disponibilidad;
    private String imagen;
}
