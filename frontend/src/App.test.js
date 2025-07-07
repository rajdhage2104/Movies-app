import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import MovieService from './services/MovieService';

// Mock the MovieService
jest.mock('./services/MovieService');

describe('App Component', () => {
  const mockMovies = [
    { id: 1, title: 'Test Movie 1', director: 'Test Director 1', releaseDate: '2023-01-01', genre: 'Action', description: 'Test description 1' },
    { id: 2, title: 'Test Movie 2', director: 'Test Director 2', releaseDate: '2023-02-02', genre: 'Comedy', description: 'Test description 2' }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    MovieService.getAllMovies.mockResolvedValue(mockMovies);
    MovieService.createMovie.mockResolvedValue(true);
    MovieService.deleteMovie.mockResolvedValue(true);
  });
  
  test('renders loading state initially', async () => {
    // Delay the mock resolution to ensure loading state is visible
    let resolvePromise;
    const promise = new Promise(resolve => { resolvePromise = resolve; });
    MovieService.getAllMovies.mockImplementationOnce(() => promise);
    
    await act(async () => {
      render(<App />);
    });
    
    expect(screen.getByRole('status')).toBeInTheDocument();
    
    // Resolve the promise to clean up
    await act(async () => {
      resolvePromise(mockMovies);
      await promise;
    });
  });

  test('renders movies after loading', async () => {
    await act(async () => {
      render(<App />);
    });
    
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
    
    expect(screen.getByText('Test Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Test Movie 2')).toBeInTheDocument();
    expect(MovieService.getAllMovies).toHaveBeenCalledTimes(1);
  });

  test('handles error when fetching movies fails', async () => {
    MovieService.getAllMovies.mockRejectedValueOnce(new Error('Failed to fetch'));
    
    await act(async () => {
      render(<App />);
    });
    
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
    
    expect(screen.getByText('Failed to load movies. Please try again later.')).toBeInTheDocument();
  });

  test('adds a new movie successfully', async () => {
    const newMovie = {
      title: 'New Movie',
      director: 'New Director',
      releaseDate: '2023-03-01',
      genre: 'Drama',
      description: 'New Description'
    };
    
    const savedMovie = { ...newMovie, id: 3 };
    
    MovieService.getAllMovies.mockResolvedValueOnce(mockMovies);
    MovieService.createMovie.mockResolvedValueOnce(savedMovie);
    
    await act(async () => {
      render(<App />);
    });
    
    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });
    
    // Fill out the form
    fireEvent.change(screen.getByTestId('title-input'), { target: { value: newMovie.title } });
    fireEvent.change(screen.getByTestId('director-input'), { target: { value: newMovie.director } });
    fireEvent.change(screen.getByTestId('release-date-input'), { target: { value: newMovie.releaseDate } });
    fireEvent.change(screen.getByTestId('genre-input'), { target: { value: newMovie.genre } });
    fireEvent.change(screen.getByTestId('description-input'), { target: { value: newMovie.description } });
    
    // Submit the form
    await act(async () => {
      fireEvent.click(screen.getByTestId('submit-button'));
    });
    
    await waitFor(() => {
      expect(MovieService.createMovie).toHaveBeenCalledWith(newMovie);
    });
    
    // Check that the new movie is added to the list
    await waitFor(() => {
      expect(screen.getByText('New Movie')).toBeInTheDocument();
    });
  });

  test('handles error when adding a movie', async () => {
    MovieService.getAllMovies.mockResolvedValueOnce(mockMovies);
    MovieService.createMovie.mockRejectedValueOnce(new Error('Failed to add'));
    
    await act(async () => {
      render(<App />);
    });
    
    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });
    
    // Fill out the form
    fireEvent.change(screen.getByTestId('title-input'), { target: { value: 'Error Movie' } });
    
    // Submit the form
    await act(async () => {
      fireEvent.click(screen.getByTestId('submit-button'));
    });
    
    await waitFor(() => {
      expect(screen.getByText('Failed to add movie. Please try again.')).toBeInTheDocument();
    });
  });

  test('deletes a movie successfully', async () => {
    MovieService.getAllMovies.mockResolvedValueOnce(mockMovies);
    MovieService.deleteMovie.mockResolvedValueOnce(true);
    
    await act(async () => {
      render(<App />);
    });
    
    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });
    
    // Click delete button for the first movie
    await act(async () => {
      fireEvent.click(screen.getByTestId('delete-button-1'));
    });
    
    await waitFor(() => {
      expect(MovieService.deleteMovie).toHaveBeenCalledWith(1);
    });
    
    // Check that the movie is removed from the list
    await waitFor(() => {
      expect(screen.queryByText('Test Movie 1')).not.toBeInTheDocument();
      expect(screen.getByText('Test Movie 2')).toBeInTheDocument();
    });
  });

  test('handles error when deleting a movie', async () => {
    MovieService.getAllMovies.mockResolvedValueOnce(mockMovies);
    MovieService.deleteMovie.mockRejectedValueOnce(new Error('Failed to delete'));
    
    await act(async () => {
      render(<App />);
    });
    
    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });
    
    // Click delete button for the first movie
    await act(async () => {
      fireEvent.click(screen.getByTestId('delete-button-1'));
    });
    
    await waitFor(() => {
      expect(screen.getByText('Failed to delete movie. Please try again.')).toBeInTheDocument();
    });
  });

  test('dismisses error message when close button is clicked', async () => {
    MovieService.getAllMovies.mockRejectedValueOnce(new Error('Failed to fetch'));
    await act(async () => {
      render(<App />);
    });
    
    await waitFor(() => {
      expect(screen.getByText('Failed to load movies. Please try again later.')).toBeInTheDocument();
    });
    
    // Click the close button on the error alert
    await act(async () => {
      fireEvent.click(screen.getByLabelText('Close'));
    });
    
    expect(screen.queryByText('Failed to load movies. Please try again later.')).not.toBeInTheDocument();
  });
});
