"use client";

import { useState, useEffect } from 'react';
import { Task } from '@/lib/types';
import { TaskInput } from '@/components/task-input/task-input';
import { TaskList } from '@/components/task-list/task-list';
import { ExportCSV } from '@/components/export-csv/export-csv';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (error) {
        console.error('Failed to parse saved tasks:', error);
      }
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleTaskAdded = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const handleTaskUpdate = (id: string, updatedTask: Partial<Task>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      )
    );
  };

  const handleTaskDelete = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Natural Language Task Manager</h1>
          <p className="text-gray-600 dark:text-gray-400">Enter tasks naturally and let AI parse them for you</p>
        </header>

        <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-3xl mx-auto mb-4">
          <div className="w-full md:flex-1 mb-4 md:mb-0">
            <TaskInput onTaskAdded={handleTaskAdded} />
          </div>
          <div className="md:ml-4">
            <ExportCSV tasks={tasks} />
          </div>
        </div>
        
        <TaskList 
          tasks={tasks} 
          onTaskUpdate={handleTaskUpdate}
          onTaskDelete={handleTaskDelete} 
        />
      </div>
    </div>
  );
}
