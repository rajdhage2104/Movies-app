import React from 'react';
import PropTypes from 'prop-types';

const MovieList = ({ movies, onDeleteMovie }) => {
  if (movies.length === 0) {
    return (
      <div className="alert alert-info" role="alert" data-testid="no-movies-message">
        No movies available. Add a new movie to get started.
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="row g-4" data-testid="movie-list">
      {movies.map(movie => (
        <div key={movie.id} className="col-md-6 col-lg-6" data-testid={`movie-item-${movie.id}`}>
          <div className="card h-100 movie-card">
            <div className="card-body">
              <button 
                className="btn btn-sm btn-danger btn-delete" 
                onClick={() => onDeleteMovie(movie.id)}
                data-testid={`delete-button-${movie.id}`}
              >
                <i className="bi bi-trash"></i> Delete
              </button>
              <h5 className="card-title">{movie.title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {movie.director ? `Directed by ${movie.director}` : 'Director unknown'}
              </h6>
              <div className="mb-2">
                <span className="badge bg-primary me-2">{movie.genre || 'Unspecified genre'}</span>
                <small className="text-muted">Released: {formatDate(movie.releaseDate)}</small>
              </div>
              <p className="card-text">{movie.description || 'No description available.'}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      director: PropTypes.string,
      releaseDate: PropTypes.string,
      genre: PropTypes.string,
      description: PropTypes.string
    })
  ).isRequired,
  onDeleteMovie: PropTypes.func.isRequired
};

export default MovieList;
