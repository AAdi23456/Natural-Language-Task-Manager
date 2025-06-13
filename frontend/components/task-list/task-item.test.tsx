import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TaskItem } from './task-item';
import { Task } from '@/lib/types';

describe('TaskItem Component', () => {
  const mockTask: Task = {
    id: '123',
    description: 'Test task',
    assignee: 'John Doe',
    dueDate: '2023-06-20T23:00:00.000Z',
    priority: 'P2'
  };
  
  const mockOnUpdate = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('renders task details correctly', () => {
    render(<TaskItem task={mockTask} onUpdate={mockOnUpdate} />);
    
    expect(screen.getByText('Test task')).toBeInTheDocument();
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/20 Jun/i)).toBeInTheDocument();
    expect(screen.getByText('P2')).toBeInTheDocument();
  });
  
  test('shows edit form when edit button is clicked', () => {
    render(<TaskItem task={mockTask} onUpdate={mockOnUpdate} />);
    
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);
    
    // Check if the form elements appear
    expect(screen.getByLabelText(/Task/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Assignee/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Due Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Priority/i)).toBeInTheDocument();
    
    // Check if save and cancel buttons appear
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });
  
  test('cancel button returns to view mode without saving', () => {
    render(<TaskItem task={mockTask} onUpdate={mockOnUpdate} />);
    
    // Enter edit mode
    fireEvent.click(screen.getByText('Edit'));
    
    // Change a field
    const taskInput = screen.getByLabelText(/Task/i);
    fireEvent.change(taskInput, { target: { value: 'Updated task' } });
    
    // Cancel the edit
    fireEvent.click(screen.getByText('Cancel'));
    
    // Check we're back in view mode with original text
    expect(screen.getByText('Test task')).toBeInTheDocument();
    expect(mockOnUpdate).not.toHaveBeenCalled();
  });
  
  test('save button calls onUpdate with edited values', () => {
    render(<TaskItem task={mockTask} onUpdate={mockOnUpdate} />);
    
    // Enter edit mode
    fireEvent.click(screen.getByText('Edit'));
    
    // Change fields
    fireEvent.change(screen.getByLabelText(/Task/i), { target: { value: 'Updated task' } });
    fireEvent.change(screen.getByLabelText(/Assignee/i), { target: { value: 'Jane Smith' } });
    fireEvent.change(screen.getByLabelText(/Priority/i), { target: { value: 'P1' } });
    
    // Save the edit
    fireEvent.click(screen.getByText('Save'));
    
    // Check onUpdate was called with the correct values
    expect(mockOnUpdate).toHaveBeenCalledWith('123', {
      id: '123',
      description: 'Updated task',
      assignee: 'Jane Smith',
      dueDate: mockTask.dueDate,
      priority: 'P1'
    });
    
    // Check we're back in view mode with updated text
    expect(screen.queryByLabelText(/Task/i)).not.toBeInTheDocument();
  });
}); 