package com.movies.controller;

import com.movies.model.Movie;
import com.movies.service.MovieService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class MovieControllerTest {

    @Mock
    private MovieService movieService;

    @InjectMocks
    private MovieController movieController;

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
        when(movieService.getAllMovies()).thenReturn(expectedMovies);

        // Act
        ResponseEntity<List<Movie>> response = movieController.getAllMovies();

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedMovies, response.getBody());
        verify(movieService, times(1)).getAllMovies();
    }

    @Test
    void getMovieById_Found() {
        // Arrange
        when(movieService.getMovieById(1L)).thenReturn(Optional.of(testMovie));

        // Act
        ResponseEntity<Movie> response = movieController.getMovieById(1L);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(testMovie, response.getBody());
        verify(movieService, times(1)).getMovieById(1L);
    }

    @Test
    void getMovieById_NotFound() {
        // Arrange
        when(movieService.getMovieById(2L)).thenReturn(Optional.empty());

        // Act
        ResponseEntity<Movie> response = movieController.getMovieById(2L);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNull(response.getBody());
        verify(movieService, times(1)).getMovieById(2L);
    }

    @Test
    void createMovie() {
        // Arrange
        when(movieService.saveMovie(any(Movie.class))).thenReturn(testMovie);

        // Act
        ResponseEntity<Movie> response = movieController.createMovie(testMovie);

        // Assert
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(testMovie, response.getBody());
        verify(movieService, times(1)).saveMovie(testMovie);
    }

    @Test
    void deleteMovie_Found() {
        // Arrange
        when(movieService.getMovieById(1L)).thenReturn(Optional.of(testMovie));
        doNothing().when(movieService).deleteMovie(1L);

        // Act
        ResponseEntity<Void> response = movieController.deleteMovie(1L);

        // Assert
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(movieService, times(1)).getMovieById(1L);
        verify(movieService, times(1)).deleteMovie(1L);
    }

    @Test
    void deleteMovie_NotFound() {
        // Arrange
        when(movieService.getMovieById(2L)).thenReturn(Optional.empty());

        // Act
        ResponseEntity<Void> response = movieController.deleteMovie(2L);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        verify(movieService, times(1)).getMovieById(2L);
        verify(movieService, never()).deleteMovie(anyLong());
    }
}
