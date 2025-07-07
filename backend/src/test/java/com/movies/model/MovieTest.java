package com.movies.model;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import java.time.LocalDate;

public class MovieTest {

    @Test
    public void testMovieConstructorAndGetters() {
        // Create a movie using all-args constructor
        Movie movie = new Movie(1L, "Test Title", "Test Director", 
                LocalDate.of(2023, 1, 1), "Test Genre", "Test Description");
        
        // Test getters
        assertEquals(1L, movie.getId());
        assertEquals("Test Title", movie.getTitle());
        assertEquals("Test Director", movie.getDirector());
        assertEquals(LocalDate.of(2023, 1, 1), movie.getReleaseDate());
        assertEquals("Test Genre", movie.getGenre());
        assertEquals("Test Description", movie.getDescription());
    }
    
    @Test
    public void testMovieSetters() {
        // Create a movie using no-args constructor
        Movie movie = new Movie();
        
        // Use setters
        movie.setId(2L);
        movie.setTitle("Updated Title");
        movie.setDirector("Updated Director");
        movie.setReleaseDate(LocalDate.of(2022, 2, 2));
        movie.setGenre("Updated Genre");
        movie.setDescription("Updated Description");
        
        // Test that values were set correctly
        assertEquals(2L, movie.getId());
        assertEquals("Updated Title", movie.getTitle());
        assertEquals("Updated Director", movie.getDirector());
        assertEquals(LocalDate.of(2022, 2, 2), movie.getReleaseDate());
        assertEquals("Updated Genre", movie.getGenre());
        assertEquals("Updated Description", movie.getDescription());
    }
    
    @Test
    public void testEqualsAndHashCode() {
        // Create two identical movies
        Movie movie1 = new Movie(1L, "Title1", "Director1", 
                LocalDate.of(2023, 1, 1), "Genre1", "Description1");
        Movie movie2 = new Movie(1L, "Title1", "Director1", 
                LocalDate.of(2023, 1, 1), "Genre1", "Description1");
        
        // Test equals and hashCode for identical objects
        assertEquals(movie1, movie2);
        assertEquals(movie1.hashCode(), movie2.hashCode());
        
        // Change properties of second movie
        movie2.setTitle("Title2");
        movie2.setDirector("Director2");
        movie2.setReleaseDate(LocalDate.of(2022, 2, 2));
        movie2.setGenre("Genre2");
        movie2.setDescription("Description2");
        
        // Test not equals with different properties
        assertNotEquals(movie1, movie2);
        
        // Create a third movie with different ID but same other properties as movie1
        Movie movie3 = new Movie(2L, "Title1", "Director1", 
                LocalDate.of(2023, 1, 1), "Genre1", "Description1");
        
        // Test not equals with different ID
        assertNotEquals(movie1, movie3);
    }
    
    @Test
    public void testToString() {
        Movie movie = new Movie(1L, "Test Title", "Test Director", 
                LocalDate.of(2023, 1, 1), "Test Genre", "Test Description");
        
        String toString = movie.toString();
        
        // Verify toString contains all fields
        assertTrue(toString.contains("id=1"));
        assertTrue(toString.contains("title=Test Title"));
        assertTrue(toString.contains("director=Test Director"));
        assertTrue(toString.contains("releaseDate=2023-01-01"));
        assertTrue(toString.contains("genre=Test Genre"));
        assertTrue(toString.contains("description=Test Description"));
    }
}
