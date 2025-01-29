package org.nocountry.backend.mascercatuyo.Config;

import jakarta.validation.Constraint;
import java.lang.annotation.*;

@Target({ElementType.FIELD})  // esto hace que se aplique a los campos
@Retention(RetentionPolicy.RUNTIME)  // esto lo mantiene andando en tiempo de ejecución
@Constraint(validatedBy = FechaNacimientoValidator.class)  // especifica el archivo de donde valida
public @interface FechaNacimientoValida {
    String message() default "Debes tener al menos 18 años";
}
