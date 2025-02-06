package org.nocountry.backend.mascercatuyo.Controllers;

import org.nocountry.backend.mascercatuyo.DTOs.CategoriaDTO;
import org.nocountry.backend.mascercatuyo.Entities.Categoria;
import org.nocountry.backend.mascercatuyo.Services.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    @CrossOrigin
    @GetMapping
    public List<CategoriaDTO> getAllCategorias() {
        return categoriaService.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @CrossOrigin
    @GetMapping("/{id}")
    public ResponseEntity<CategoriaDTO> getServicioById(@PathVariable Long id) {
        Optional<Categoria> categoria = categoriaService.findById(id);
        return categoria.map(value -> ResponseEntity.ok(convertToDTO(value)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @CrossOrigin
    @PostMapping
    public ResponseEntity<CategoriaDTO> createCategoria(@RequestBody CategoriaDTO dto) {
        Categoria categoria = convertToEntity(dto);
        Categoria savedCategoria = categoriaService.save(categoria);
        return ResponseEntity.status(HttpStatus.CREATED).body(convertToDTO(savedCategoria));
    }

    @CrossOrigin
    @PutMapping("/{id}")
    public ResponseEntity<CategoriaDTO> updateCateogoria(@PathVariable Long id, @RequestBody CategoriaDTO dto) {
        Optional<Categoria> existingCategoria = categoriaService.findById(id);
        if (existingCategoria.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Categoria categoria = convertToEntity(dto);
        categoria.setId(id);
        Categoria updatedCategoria = categoriaService.save(categoria);
        return ResponseEntity.ok(convertToDTO(updatedCategoria));
    }

    @CrossOrigin
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategoria(@PathVariable Long id) {
        if (categoriaService.findById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        categoriaService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private CategoriaDTO convertToDTO(Categoria categoria) {
        return CategoriaDTO.builder()
                .id(categoria.getId())
                .categoria(categoria.getCategoria())
                .build();
    }

    private Categoria convertToEntity(CategoriaDTO dto) {
        return Categoria.builder()
                .categoria(dto.getCategoria())
                .build();
    }
}
