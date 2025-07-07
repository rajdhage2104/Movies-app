package com.movies.repository;

import com.movies.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
    // Spring Data JPA provides all basic CRUD operations
    // We can add custom query methods here if needed
}
