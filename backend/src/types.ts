export interface Task {
  id: string;
  description: string;
  assignee: string | null;
  dueDate: string | null;
  priority: 'P1' | 'P2' | 'P3' | 'P4';
}

export interface ParseTaskRequest {
  taskText: string;
} 