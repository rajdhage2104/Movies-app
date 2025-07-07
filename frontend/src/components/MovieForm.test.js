import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import MovieForm from './MovieForm';

describe('MovieForm Component', () => {
  const mockAddMovie = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('renders form elements correctly', async () => {
    await act(async () => {
      render(<MovieForm onAddMovie={mockAddMovie} />);
    });
    
    expect(screen.getByTestId('movie-form')).toBeInTheDocument();
    expect(screen.getByTestId('title-input')).toBeInTheDocument();
    expect(screen.getByTestId('director-input')).toBeInTheDocument();
    expect(screen.getByTestId('release-date-input')).toBeInTheDocument();
    expect(screen.getByTestId('genre-input')).toBeInTheDocument();
    expect(screen.getByTestId('description-input')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });
  
  test('updates form state when inputs change', async () => {
    await act(async () => {
      render(<MovieForm onAddMovie={mockAddMovie} />);
    });
    
    const titleInput = screen.getByTestId('title-input');
    const directorInput = screen.getByTestId('director-input');
    const releaseDateInput = screen.getByTestId('release-date-input');
    const genreInput = screen.getByTestId('genre-input');
    const descriptionInput = screen.getByTestId('description-input');
    
    await act(async () => {
      fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    });
    await act(async () => {
      fireEvent.change(directorInput, { target: { value: 'Test Director' } });
    });
    await act(async () => {
      fireEvent.change(releaseDateInput, { target: { value: '2023-01-01' } });
    });
    await act(async () => {
      fireEvent.change(genreInput, { target: { value: 'Test Genre' } });
    });
    await act(async () => {
      fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    });
    
    expect(titleInput.value).toBe('Test Title');
    expect(directorInput.value).toBe('Test Director');
    expect(releaseDateInput.value).toBe('2023-01-01');
    expect(genreInput.value).toBe('Test Genre');
    expect(descriptionInput.value).toBe('Test Description');
  });
  
  test('shows validation error when title is empty', async () => {
    await act(async () => {
      render(<MovieForm onAddMovie={mockAddMovie} />);
    });
    
    // Submit form without entering a title
    fireEvent.click(screen.getByTestId('submit-button'));
    
    // Check that validation error is shown
    expect(screen.getByText('Title is required')).toBeInTheDocument();
    
    // Check that onAddMovie was not called
    expect(mockAddMovie).not.toHaveBeenCalled();
  });
  
  test('clears validation error when user types in title field', async () => {
    await act(async () => {
      render(<MovieForm onAddMovie={mockAddMovie} />);
    });
    
    // Submit form without entering a title to trigger validation error
    fireEvent.click(screen.getByTestId('submit-button'));
    
    // Check that validation error is shown
    expect(screen.getByText('Title is required')).toBeInTheDocument();
    
    // Type in the title field
    fireEvent.change(screen.getByTestId('title-input'), { target: { value: 'Test Title' } });
    
    // Check that validation error is cleared
    expect(screen.queryByText('Title is required')).not.toBeInTheDocument();
  });
  
  test('submits form with valid data', async () => {
    mockAddMovie.mockResolvedValueOnce(true);
    await act(async () => {
      render(<MovieForm onAddMovie={mockAddMovie} />);
    });
    
    // Fill out the form
    fireEvent.change(screen.getByTestId('title-input'), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByTestId('director-input'), { target: { value: 'Test Director' } });
    fireEvent.change(screen.getByTestId('release-date-input'), { target: { value: '2023-01-01' } });
    fireEvent.change(screen.getByTestId('genre-input'), { target: { value: 'Test Genre' } });
    fireEvent.change(screen.getByTestId('description-input'), { target: { value: 'Test Description' } });
    
    // Submit the form
    fireEvent.click(screen.getByTestId('submit-button'));
    
    // Check that onAddMovie was called with the correct data
    expect(mockAddMovie).toHaveBeenCalledWith({
      title: 'Test Title',
      director: 'Test Director',
      releaseDate: '2023-01-01',
      genre: 'Test Genre',
      description: 'Test Description'
    });
    
    // Check that form is reset after successful submission
    await waitFor(() => {
      expect(screen.getByTestId('title-input').value).toBe('');
      expect(screen.getByTestId('director-input').value).toBe('');
      expect(screen.getByTestId('release-date-input').value).toBe('');
      expect(screen.getByTestId('genre-input').value).toBe('');
      expect(screen.getByTestId('description-input').value).toBe('');
    });
  });
  
  test('does not reset form when submission fails', async () => {
    mockAddMovie.mockResolvedValueOnce(false);
    await act(async () => {
      render(<MovieForm onAddMovie={mockAddMovie} />);
    });
    
    // Fill out the form
    fireEvent.change(screen.getByTestId('title-input'), { target: { value: 'Test Title' } });
    
    // Submit the form
    fireEvent.click(screen.getByTestId('submit-button'));
    
    // Check that form is not reset after failed submission
    await waitFor(() => {
      expect(screen.getByTestId('title-input').value).toBe('Test Title');
    });
  });
  
  test('disables form inputs and shows spinner during submission', async () => {
    // Create a promise that we can resolve manually to control the timing
    let resolvePromise;
    const promise = new Promise(resolve => {
      resolvePromise = resolve;
    });
    mockAddMovie.mockImplementationOnce(() => promise);
    
    await act(async () => {
      render(<MovieForm onAddMovie={mockAddMovie} />);
    });
    
    // Fill out the form
    fireEvent.change(screen.getByTestId('title-input'), { target: { value: 'Test Title' } });
    
    // Submit the form
    fireEvent.click(screen.getByTestId('submit-button'));
    
    // Check that inputs and button are disabled during submission
    expect(screen.getByTestId('title-input')).toBeDisabled();
    expect(screen.getByTestId('director-input')).toBeDisabled();
    expect(screen.getByTestId('release-date-input')).toBeDisabled();
    expect(screen.getByTestId('genre-input')).toBeDisabled();
    expect(screen.getByTestId('description-input')).toBeDisabled();
    expect(screen.getByTestId('submit-button')).toBeDisabled();
    
    // Check that spinner is shown
    expect(screen.getByText('Adding...')).toBeInTheDocument();
    
    // Resolve the promise to complete the submission
    resolvePromise(true);
    
    // Check that inputs are re-enabled after submission
    await waitFor(() => {
      expect(screen.getByTestId('title-input')).not.toBeDisabled();
      expect(screen.getByTestId('submit-button')).not.toBeDisabled();
      expect(screen.queryByText('Adding...')).not.toBeInTheDocument();
    });
  });
});
