package org.nocountry.backend.mascercatuyo.Repositories;

import org.nocountry.backend.mascercatuyo.Entities.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
}
