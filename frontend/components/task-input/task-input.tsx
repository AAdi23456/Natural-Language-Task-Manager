"use client";

import { useState } from 'react';
import { parseTask } from '@/lib/api';
import { Task } from '@/lib/types';

interface TaskInputProps {
  onTaskAdded: (task: Task) => void;
}

export function TaskInput({ onTaskAdded }: TaskInputProps) {
  const [taskText, setTaskText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!taskText.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await parseTask(taskText);
      
      if (result.success && result.data) {
        onTaskAdded(result.data);
        setTaskText('');
      } else {
        setError(result.error || 'Failed to parse task');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="Add a task like: 'Finish landing page Aman by 11pm 20th June'"
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300 dark:disabled:bg-blue-800 disabled:cursor-not-allowed"
            disabled={isLoading || !taskText.trim()}
          >
            {isLoading ? 'Processing...' : 'Add Task'}
          </button>
        </div>
        {error && <p className="text-red-500 dark:text-red-400 text-sm">{error}</p>}
      </form>
    </div>
  );
} 