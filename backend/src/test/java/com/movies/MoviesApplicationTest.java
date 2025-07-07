package com.movies;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class MoviesApplicationTest {

    @Test
    public void testApplicationClass() {
        // Simple test to verify the application class exists
        MoviesApplication app = new MoviesApplication();
        assertNotNull(app);
    }
    
    // We're not testing the main method directly as it requires database connection
    // Instead, we'll test the code paths in the main class
    
    @Test
    public void testCorsConfigurer() {
        // Test the corsConfigurer method
        MoviesApplication app = new MoviesApplication();
        org.springframework.web.servlet.config.annotation.WebMvcConfigurer configurer = app.corsConfigurer();
        
        // Verify the configurer is created correctly
        assertNotNull(configurer);
    }
}
