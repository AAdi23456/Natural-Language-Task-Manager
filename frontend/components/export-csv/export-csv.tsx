"use client";

import { Task } from '@/lib/types';
import { format } from 'date-fns';

interface ExportCSVProps {
  tasks: Task[];
}

export function ExportCSV({ tasks }: ExportCSVProps) {
  const formatDueDate = (dateString: string | null) => {
    if (!dateString) return '';
    try {
      return format(new Date(dateString), 'yyyy-MM-dd HH:mm');
    } catch (error) {
      return '';
    }
  };

  const generateCSV = () => {
    // CSV header
    const csvHeader = ['Task', 'Assignee', 'Due Date', 'Priority'].join(',');
    
    // Generate CSV rows
    const csvRows = tasks.map((task) => {
      const description = `"${task.description.replace(/"/g, '""')}"`; // Handle quotes in text
      const assignee = task.assignee ? `"${task.assignee.replace(/"/g, '""')}"` : '';
      const dueDate = formatDueDate(task.dueDate);
      const priority = task.priority;
      
      return [description, assignee, dueDate, priority].join(',');
    });
    
    // Combine header and rows
    const csvString = [csvHeader, ...csvRows].join('\n');
    
    // Create downloadable link
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    // Create link and trigger download
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `tasks_${format(new Date(), 'yyyy-MM-dd')}.csv`);
    link.style.display = 'none';
    document.body.appendChild(link);
    
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={generateCSV}
      disabled={tasks.length === 0}
      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none disabled:bg-green-300 dark:disabled:bg-green-800 disabled:cursor-not-allowed"
    >
      Export to CSV
    </button>
  );
} 