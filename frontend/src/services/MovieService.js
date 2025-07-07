import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/movies';

class MovieService {
  static async getAllMovies() {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  }

  static async getMovieById(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching movie with id ${id}:`, error);
      throw error;
    }
  }

  static async createMovie(movie) {
    try {
      const response = await axios.post(API_BASE_URL, movie);
      return response.data;
    } catch (error) {
      console.error('Error creating movie:', error);
      throw error;
    }
  }

  static async deleteMovie(id) {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting movie with id ${id}:`, error);
      throw error;
    }
  }
}

export default MovieService;
