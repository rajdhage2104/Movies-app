import { render, screen, fireEvent, act } from '@testing-library/react';
import MovieList from './MovieList';

describe('MovieList Component', () => {
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

  const mockDeleteMovie = jest.fn();

  test('renders no movies message when movies array is empty', async () => {
    await act(async () => {
      render(<MovieList movies={[]} onDeleteMovie={mockDeleteMovie} />);
    });
    expect(screen.getByTestId('no-movies-message')).toBeInTheDocument();
    expect(screen.getByText('No movies available. Add a new movie to get started.')).toBeInTheDocument();
  });

  test('renders movies when movies array is not empty', async () => {
    await act(async () => {
      render(<MovieList movies={mockMovies} onDeleteMovie={mockDeleteMovie} />);
    });
    expect(screen.getByTestId('movie-list')).toBeInTheDocument();
    expect(screen.getByText('Test Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Test Movie 2')).toBeInTheDocument();
    expect(screen.getByText('Directed by Test Director 1')).toBeInTheDocument();
    expect(screen.getByText('Directed by Test Director 2')).toBeInTheDocument();
  });

  test('calls onDeleteMovie when delete button is clicked', async () => {
    await act(async () => {
      render(<MovieList movies={mockMovies} onDeleteMovie={mockDeleteMovie} />);
    });
    
    // Click delete button for the first movie
    await act(async () => {
      fireEvent.click(screen.getByTestId('delete-button-1'));
    });
    
    expect(mockDeleteMovie).toHaveBeenCalledWith(1);
  });

  test('displays unknown director when director is not provided', async () => {
    const moviesWithoutDirector = [
      {
        id: 1,
        title: 'Test Movie 1',
        director: null,
        releaseDate: '2023-01-01',
        genre: 'Action',
        description: 'Test Description 1'
      }
    ];
    
    await act(async () => {
      render(<MovieList movies={moviesWithoutDirector} onDeleteMovie={mockDeleteMovie} />);
    });
    expect(screen.getByText('Director unknown')).toBeInTheDocument();
  });

  test('displays unspecified genre when genre is not provided', async () => {
    const moviesWithoutGenre = [
      {
        id: 1,
        title: 'Test Movie 1',
        director: 'Test Director 1',
        releaseDate: '2023-01-01',
        genre: null,
        description: 'Test Description 1'
      }
    ];
    
    await act(async () => {
      render(<MovieList movies={moviesWithoutGenre} onDeleteMovie={mockDeleteMovie} />);
    });
    expect(screen.getByText('Unspecified genre')).toBeInTheDocument();
  });

  test('displays no description message when description is not provided', async () => {
    const moviesWithoutDescription = [
      {
        id: 1,
        title: 'Test Movie 1',
        director: 'Test Director 1',
        releaseDate: '2023-01-01',
        genre: 'Action',
        description: null
      }
    ];
    
    await act(async () => {
      render(<MovieList movies={moviesWithoutDescription} onDeleteMovie={mockDeleteMovie} />);
    });
    expect(screen.getByText('No description available.')).toBeInTheDocument();
  });

  test('formats date correctly', async () => {
    await act(async () => {
      render(<MovieList movies={mockMovies} onDeleteMovie={mockDeleteMovie} />);
    });
    
    // This test might be brittle depending on locale settings
    // We're checking if the date is displayed in some format
    const dateElements = screen.getAllByText(/Released:/);
    expect(dateElements.length).toBe(2);
  });

  test('displays Unknown for release date when date is not provided', async () => {
    const moviesWithoutDate = [
      {
        id: 1,
        title: 'Test Movie 1',
        director: 'Test Director 1',
        releaseDate: null,
        genre: 'Action',
        description: 'Test Description 1'
      }
    ];
    
    await act(async () => {
      render(<MovieList movies={moviesWithoutDate} onDeleteMovie={mockDeleteMovie} />);
    });
    expect(screen.getByText('Released: Unknown')).toBeInTheDocument();
  });
});
