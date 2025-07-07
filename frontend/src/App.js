import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/MovieList';
import MovieForm from './components/MovieForm';
import MovieService from './services/MovieService';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      setLoading(true);
      const data = await MovieService.getAllMovies();
      setMovies(data);
      setError(null);
    } catch (err) {
      setError('Failed to load movies. Please try again later.');
      console.error('Error loading movies:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMovie = async (movie) => {
    try {
      const savedMovie = await MovieService.createMovie(movie);
      setMovies([...movies, savedMovie]);
      return true;
    } catch (err) {
      setError('Failed to add movie. Please try again.');
      console.error('Error adding movie:', err);
      return false;
    }
  };

  const handleDeleteMovie = async (id) => {
    try {
      await MovieService.deleteMovie(id);
      setMovies(movies.filter(movie => movie.id !== id));
      return true;
    } catch (err) {
      setError('Failed to delete movie. Please try again.');
      console.error('Error deleting movie:', err);
      return false;
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Movies App</h1>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
          <button 
            type="button" 
            className="btn-close float-end" 
            onClick={() => setError(null)}
            aria-label="Close"
          ></button>
        </div>
      )}
      
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h5 className="card-title mb-0">Add New Movie</h5>
            </div>
            <div className="card-body">
              <MovieForm onAddMovie={handleAddMovie} />
            </div>
          </div>
        </div>
        
        <div className="col-md-8">
          {loading ? (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <MovieList 
              movies={movies} 
              onDeleteMovie={handleDeleteMovie} 
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
