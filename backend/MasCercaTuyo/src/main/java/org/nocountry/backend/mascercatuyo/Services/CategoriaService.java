package org.nocountry.backend.mascercatuyo.Services;

import org.nocountry.backend.mascercatuyo.Entities.Categoria;
import org.nocountry.backend.mascercatuyo.Entities.Servicio;
import org.nocountry.backend.mascercatuyo.Repositories.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    public List<Categoria> findAll() {
        return categoriaRepository.findAll();
    }

    public Optional<Categoria> findById(Long id) {
        return categoriaRepository.findById(id);
    }

    public Categoria save(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    public void deleteById(Long id) {
        categoriaRepository.deleteById(id);
    }
}
