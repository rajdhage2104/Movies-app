import React, { useState } from 'react';
import PropTypes from 'prop-types';

const MovieForm = ({ onAddMovie }) => {
  const initialFormState = {
    title: '',
    director: '',
    releaseDate: '',
    genre: '',
    description: ''
  };
  
  const [movie, setMovie] = useState(initialFormState);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMovie({ ...movie, [name]: value });
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!movie.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setSubmitting(true);
    
    try {
      const success = await onAddMovie(movie);
      if (success) {
        setMovie(initialFormState);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="movie-form" data-testid="movie-form">
      <div className="mb-3">
        <label htmlFor="title" className="form-label required-field">Title</label>
        <input
          type="text"
          className={`form-control ${errors.title ? 'is-invalid' : ''}`}
          id="title"
          name="title"
          value={movie.title}
          onChange={handleInputChange}
          disabled={submitting}
          data-testid="title-input"
        />
        {errors.title && <div className="invalid-feedback">{errors.title}</div>}
      </div>
      
      <div className="mb-3">
        <label htmlFor="director" className="form-label">Director</label>
        <input
          type="text"
          className="form-control"
          id="director"
          name="director"
          value={movie.director}
          onChange={handleInputChange}
          disabled={submitting}
          data-testid="director-input"
        />
      </div>
      
      <div className="mb-3">
        <label htmlFor="releaseDate" className="form-label">Release Date</label>
        <input
          type="date"
          className="form-control"
          id="releaseDate"
          name="releaseDate"
          value={movie.releaseDate}
          onChange={handleInputChange}
          disabled={submitting}
          data-testid="release-date-input"
        />
      </div>
      
      <div className="mb-3">
        <label htmlFor="genre" className="form-label">Genre</label>
        <input
          type="text"
          className="form-control"
          id="genre"
          name="genre"
          value={movie.genre}
          onChange={handleInputChange}
          disabled={submitting}
          data-testid="genre-input"
        />
      </div>
      
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          rows="3"
          value={movie.description}
          onChange={handleInputChange}
          disabled={submitting}
          data-testid="description-input"
        ></textarea>
      </div>
      
      <button 
        type="submit" 
        className="btn btn-primary w-100" 
        disabled={submitting}
        data-testid="submit-button"
      >
        {submitting ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Adding...
          </>
        ) : 'Add Movie'}
      </button>
    </form>
  );
};

MovieForm.propTypes = {
  onAddMovie: PropTypes.func.isRequired
};

export default MovieForm;
