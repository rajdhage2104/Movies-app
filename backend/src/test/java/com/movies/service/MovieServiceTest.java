package com.movies.service;

import com.movies.model.Movie;
import com.movies.repository.MovieRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class MovieServiceTest {

    @Mock
    private MovieRepository movieRepository;

    @InjectMocks
    private MovieService movieService;

    private Movie testMovie;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        
        testMovie = new Movie();
        testMovie.setId(1L);
        testMovie.setTitle("Test Movie");
        testMovie.setDirector("Test Director");
        testMovie.setReleaseDate(LocalDate.of(2023, 1, 1));
        testMovie.setGenre("Action");
        testMovie.setDescription("Test Description");
    }

    @Test
    void getAllMovies() {
        // Arrange
        List<Movie> expectedMovies = Arrays.asList(testMovie);
        when(movieRepository.findAll()).thenReturn(expectedMovies);

        // Act
        List<Movie> actualMovies = movieService.getAllMovies();

        // Assert
        assertEquals(expectedMovies, actualMovies);
        verify(movieRepository, times(1)).findAll();
    }

    @Test
    void getMovieById() {
        // Arrange
        when(movieRepository.findById(1L)).thenReturn(Optional.of(testMovie));

        // Act
        Optional<Movie> actualMovie = movieService.getMovieById(1L);

        // Assert
        assertTrue(actualMovie.isPresent());
        assertEquals(testMovie, actualMovie.get());
        verify(movieRepository, times(1)).findById(1L);
    }

    @Test
    void getMovieById_NotFound() {
        // Arrange
        when(movieRepository.findById(2L)).thenReturn(Optional.empty());

        // Act
        Optional<Movie> actualMovie = movieService.getMovieById(2L);

        // Assert
        assertFalse(actualMovie.isPresent());
        verify(movieRepository, times(1)).findById(2L);
    }

    @Test
    void saveMovie() {
        // Arrange
        when(movieRepository.save(any(Movie.class))).thenReturn(testMovie);

        // Act
        Movie savedMovie = movieService.saveMovie(testMovie);

        // Assert
        assertEquals(testMovie, savedMovie);
        verify(movieRepository, times(1)).save(testMovie);
    }

    @Test
    void deleteMovie() {
        // Arrange
        doNothing().when(movieRepository).deleteById(1L);

        // Act
        movieService.deleteMovie(1L);

        // Assert
        verify(movieRepository, times(1)).deleteById(1L);
    }
}
