export type Priority = 'low' | 'medium' | 'high';

export type Tag = {
  id: string;
  name: string;
  color: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  dueDate: Date | null;
  priority: Priority;
  tags: string[];
};

export type TaskFilter = {
  status: 'all' | 'active' | 'completed';
  priority: 'all' | Priority;
  selectedTags: string[];
  searchTerm: string;
};

export type ThemeMode = 'light' | 'dark';

export type TaskStats = {
  total: number;
  completed: number;
  overdue: number;
  highPriority: number;
  completionRate: number;
};