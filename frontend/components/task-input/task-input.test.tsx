import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TaskInput } from './task-input';
import { parseTask } from '@/lib/api';

// Mock the api module
jest.mock('@/lib/api', () => ({
  parseTask: jest.fn(),
}));

describe('TaskInput Component', () => {
  const mockOnTaskAdded = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('renders input field and button', () => {
    render(<TaskInput onTaskAdded={mockOnTaskAdded} />);
    
    expect(screen.getByPlaceholderText(/Add a task/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();
  });
  
  test('button is disabled when input is empty', () => {
    render(<TaskInput onTaskAdded={mockOnTaskAdded} />);
    
    const button = screen.getByRole('button', { name: /add task/i });
    expect(button).toBeDisabled();
  });
  
  test('button is enabled when input has value', () => {
    render(<TaskInput onTaskAdded={mockOnTaskAdded} />);
    
    const input = screen.getByPlaceholderText(/Add a task/i);
    fireEvent.change(input, { target: { value: 'Test task' } });
    
    const button = screen.getByRole('button', { name: /add task/i });
    expect(button).toBeEnabled();
  });
  
  test('calls parseTask and onTaskAdded when form is submitted', async () => {
    const mockTask = { 
      id: '123', 
      description: 'Test task', 
      assignee: 'John', 
      dueDate: null, 
      priority: 'P3' 
    };
    
    (parseTask as jest.Mock).mockResolvedValue({ 
      success: true, 
      data: mockTask 
    });
    
    render(<TaskInput onTaskAdded={mockOnTaskAdded} />);
    
    const input = screen.getByPlaceholderText(/Add a task/i);
    fireEvent.change(input, { target: { value: 'Test task John' } });
    
    const button = screen.getByRole('button', { name: /add task/i });
    fireEvent.click(button);
    
    expect(parseTask).toHaveBeenCalledWith('Test task John');
    
    await waitFor(() => {
      expect(mockOnTaskAdded).toHaveBeenCalledWith(mockTask);
    });
    
    // Input should be cleared after submission
    expect(input).toHaveValue('');
  });
  
  test('displays error message when parseTask fails', async () => {
    (parseTask as jest.Mock).mockResolvedValue({ 
      success: false, 
      error: 'Failed to parse task' 
    });
    
    render(<TaskInput onTaskAdded={mockOnTaskAdded} />);
    
    const input = screen.getByPlaceholderText(/Add a task/i);
    fireEvent.change(input, { target: { value: 'Test task' } });
    
    const button = screen.getByRole('button', { name: /add task/i });
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByText('Failed to parse task')).toBeInTheDocument();
    });
    
    expect(mockOnTaskAdded).not.toHaveBeenCalled();
  });
}); 