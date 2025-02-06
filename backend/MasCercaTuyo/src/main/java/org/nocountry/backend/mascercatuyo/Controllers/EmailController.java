package org.nocountry.backend.mascercatuyo.Controllers;

import lombok.RequiredArgsConstructor;
import org.nocountry.backend.mascercatuyo.Services.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

import org.nocountry.backend.mascercatuyo.DTOs.LoginRequestDTO;

@RestController
@RequestMapping("/api/login")
@RequiredArgsConstructor
public class EmailController {
    private final AuthService authService;

    @PostMapping
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO loginRequest) {
        if (authService.autenticarUsuario(loginRequest.getCorreo(), loginRequest.getContrasena())) {
            return ResponseEntity.ok(Map.of("mensaje", "Login exitoso"));
        } else {
            return ResponseEntity.status(401).body(Map.of("error", "Credenciales incorrectas"));
        }
    }
}
