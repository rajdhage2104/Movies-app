package com.movies.service;

import com.movies.model.Movie;
import com.movies.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MovieService {
    
    private final MovieRepository movieRepository;
    
    @Autowired
    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }
    
    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }
    
    public Optional<Movie> getMovieById(Long id) {
        return movieRepository.findById(id);
    }
    
    public Movie saveMovie(Movie movie) {
        return movieRepository.save(movie);
    }
    
    public void deleteMovie(Long id) {
        movieRepository.deleteById(id);
    }
}
