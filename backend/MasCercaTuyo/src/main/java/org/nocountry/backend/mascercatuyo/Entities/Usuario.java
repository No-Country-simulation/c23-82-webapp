package org.nocountry.backend.mascercatuyo.Entities;

import jakarta.persistence.*;
import lombok.*;
import java.util.*;
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_apellido", nullable = false)
    private String nombreApellido;

    private String domicilio;
    private String alias;
    private String correo;
    private String contrasena;

    @Column(name = "fecha_nacimiento")
    @Temporal(TemporalType.DATE)
    private Date fechaNacimiento;

    @Column(name = "id_certificado")
    private Long idCertificado;

    private Boolean disponibilidad;
    private String token;
    private String imagen;
}
