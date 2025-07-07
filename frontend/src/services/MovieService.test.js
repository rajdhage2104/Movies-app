import axios from 'axios';
import '@testing-library/jest-dom';
import MovieService from './MovieService';

// Mock axios
jest.mock('axios');

describe('MovieService', () => {
  const mockMovies = [
    {
      id: 1,
      title: 'Test Movie 1',
      director: 'Test Director 1',
      releaseDate: '2023-01-01',
      genre: 'Action',
      description: 'Test Description 1'
    },
    {
      id: 2,
      title: 'Test Movie 2',
      director: 'Test Director 2',
      releaseDate: '2023-02-01',
      genre: 'Comedy',
      description: 'Test Description 2'
    }
  ];

  const mockMovie = {
    id: 1,
    title: 'Test Movie 1',
    director: 'Test Director 1',
    releaseDate: '2023-01-01',
    genre: 'Action',
    description: 'Test Description 1'
  };

  const mockNewMovie = {
    title: 'New Movie',
    director: 'New Director',
    releaseDate: '2023-03-01',
    genre: 'Drama',
    description: 'New Description'
  };

  const mockSavedMovie = {
    ...mockNewMovie,
    id: 3
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllMovies', () => {
    test('fetches movies successfully', async () => {
      axios.get.mockResolvedValueOnce({ data: mockMovies });
      
      const result = await MovieService.getAllMovies();
      
      expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/api/movies');
      expect(result).toEqual(mockMovies);
    });

    test('handles error when fetching movies fails', async () => {
      const errorMessage = 'Network Error';
      axios.get.mockRejectedValueOnce(new Error(errorMessage));
      
      await expect(MovieService.getAllMovies()).rejects.toThrow(errorMessage);
      expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/api/movies');
    });
  });

  describe('getMovieById', () => {
    test('fetches a movie by id successfully', async () => {
      axios.get.mockResolvedValueOnce({ data: mockMovie });
      
      const result = await MovieService.getMovieById(1);
      
      expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/api/movies/1');
      expect(result).toEqual(mockMovie);
    });

    test('handles error when fetching a movie by id fails', async () => {
      const errorMessage = 'Network Error';
      axios.get.mockRejectedValueOnce(new Error(errorMessage));
      
      await expect(MovieService.getMovieById(1)).rejects.toThrow(errorMessage);
      expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/api/movies/1');
    });
  });

  describe('createMovie', () => {
    test('creates a movie successfully', async () => {
      axios.post.mockResolvedValueOnce({ data: mockSavedMovie });
      
      const result = await MovieService.createMovie(mockNewMovie);
      
      expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/api/movies', mockNewMovie);
      expect(result).toEqual(mockSavedMovie);
    });

    test('handles error when creating a movie fails', async () => {
      const errorMessage = 'Network Error';
      axios.post.mockRejectedValueOnce(new Error(errorMessage));
      
      await expect(MovieService.createMovie(mockNewMovie)).rejects.toThrow(errorMessage);
      expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/api/movies', mockNewMovie);
    });
  });

  describe('deleteMovie', () => {
    test('deletes a movie successfully', async () => {
      axios.delete.mockResolvedValueOnce({});
      
      const result = await MovieService.deleteMovie(1);
      
      expect(axios.delete).toHaveBeenCalledWith('http://localhost:8080/api/movies/1');
      expect(result).toBe(true);
    });

    test('handles error when deleting a movie fails', async () => {
      const errorMessage = 'Network Error';
      axios.delete.mockRejectedValueOnce(new Error(errorMessage));
      
      await expect(MovieService.deleteMovie(1)).rejects.toThrow(errorMessage);
      expect(axios.delete).toHaveBeenCalledWith('http://localhost:8080/api/movies/1');
    });
  });
});
