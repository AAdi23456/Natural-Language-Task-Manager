import { Task, ApiResponse } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const parseTask = async (taskText: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_URL}/api/parse-task`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ taskText }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { 
        success: false, 
        error: errorData.error || 'Failed to parse task'
      };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error parsing task:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An unexpected error occurred' 
    };
  }
}; 