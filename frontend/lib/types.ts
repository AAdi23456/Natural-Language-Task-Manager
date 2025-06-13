export interface Task {
  id: string;
  description: string;
  assignee: string | null;
  dueDate: string | null;
  priority: 'P1' | 'P2' | 'P3' | 'P4';
}

export type PriorityType = 'P1' | 'P2' | 'P3' | 'P4';

export interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
} 