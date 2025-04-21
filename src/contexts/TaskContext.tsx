import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Task, TaskFilter, Tag, TaskStats } from '../types';

// Context type
type TaskContextType = {
  tasks: Task[];
  tags: Tag[];
  filter: TaskFilter;
  stats: TaskStats;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
  addTag: (tag: Omit<Tag, 'id'>) => void;
  deleteTag: (id: string) => void;
  updateFilter: (updates: Partial<TaskFilter>) => void;
  reorderTasks: (taskIds: string[]) => void;
};

// Initial state
const initialFilter: TaskFilter = {
  status: 'all',
  priority: 'all',
  selectedTags: [],
  searchTerm: ''
};

const initialTags: Tag[] = [
  { id: '1', name: 'Work', color: 'blue' },
  { id: '2', name: 'Personal', color: 'purple' },
  { id: '3', name: 'Urgent', color: 'red' },
  { id: '4', name: 'Learning', color: 'emerald' },
  { id: '5', name: 'Health', color: 'yellow' }
];

// Actions
type Action =
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: { id: string; updates: Partial<Task> } }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'TOGGLE_TASK_COMPLETION'; payload: string }
  | { type: 'ADD_TAG'; payload: Tag }
  | { type: 'DELETE_TAG'; payload: string }
  | { type: 'UPDATE_FILTER'; payload: Partial<TaskFilter> }
  | { type: 'REORDER_TASKS'; payload: string[] }
  | { type: 'SET_TASKS'; payload: Task[] }
  | { type: 'SET_TAGS'; payload: Tag[] };

// Reducer
const taskReducer = (state: { tasks: Task[]; tags: Tag[]; filter: TaskFilter }, action: Action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task => 
          task.id === action.payload.id ? { ...task, ...action.payload.updates } : task
        )
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    case 'TOGGLE_TASK_COMPLETION':
      return {
        ...state,
        tasks: state.tasks.map(task => 
          task.id === action.payload ? { ...task, completed: !task.completed } : task
        )
      };
    case 'ADD_TAG':
      return {
        ...state,
        tags: [...state.tags, action.payload]
      };
    case 'DELETE_TAG':
      return {
        ...state,
        tags: state.tags.filter(tag => tag.id !== action.payload),
        tasks: state.tasks.map(task => ({
          ...task,
          tags: task.tags.filter(tagId => tagId !== action.payload)
        }))
      };
    case 'UPDATE_FILTER':
      return {
        ...state,
        filter: { ...state.filter, ...action.payload }
      };
    case 'REORDER_TASKS':
      const reorderedTasks = [...state.tasks];
      // Reorder according to the payload array of IDs
      reorderedTasks.sort((a, b) => {
        const aIndex = action.payload.indexOf(a.id);
        const bIndex = action.payload.indexOf(b.id);
        return aIndex - bIndex;
      });
      return {
        ...state,
        tasks: reorderedTasks
      };
    case 'SET_TASKS':
      return {
        ...state,
        tasks: action.payload
      };
    case 'SET_TAGS':
      return {
        ...state,
        tags: action.payload
      };
    default:
      return state;
  }
};

// Create context
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Provider component
export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, {
    tasks: [],
    tags: initialTags,
    filter: initialFilter
  });

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    const savedTags = localStorage.getItem('tags');
    
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks).map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          dueDate: task.dueDate ? new Date(task.dueDate) : null
        }));
        dispatch({ type: 'SET_TASKS', payload: parsedTasks });
      } catch (e) {
        console.error('Error parsing saved tasks', e);
      }
    }
    
    if (savedTags) {
      try {
        dispatch({ type: 'SET_TAGS', payload: JSON.parse(savedTags) });
      } catch (e) {
        console.error('Error parsing saved tags', e);
      }
    }
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
    localStorage.setItem('tags', JSON.stringify(state.tags));
  }, [state.tasks, state.tags]);

  // Calculate stats
  const now = new Date();
  const stats: TaskStats = {
    total: state.tasks.length,
    completed: state.tasks.filter(task => task.completed).length,
    overdue: state.tasks.filter(task => 
      !task.completed && task.dueDate && new Date(task.dueDate) < now
    ).length,
    highPriority: state.tasks.filter(task => task.priority === 'high').length,
    completionRate: state.tasks.length > 0 
      ? Math.round((state.tasks.filter(task => task.completed).length / state.tasks.length) * 100) 
      : 0
  };

  // Context actions
  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date()
    };
    dispatch({ type: 'ADD_TASK', payload: newTask });
  };

  const updateTask = (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    dispatch({ type: 'UPDATE_TASK', payload: { id, updates } });
  };

  const deleteTask = (id: string) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  const toggleTaskCompletion = (id: string) => {
    dispatch({ type: 'TOGGLE_TASK_COMPLETION', payload: id });
  };

  const addTag = (tag: Omit<Tag, 'id'>) => {
    const newTag: Tag = {
      ...tag,
      id: crypto.randomUUID()
    };
    dispatch({ type: 'ADD_TAG', payload: newTag });
  };

  const deleteTag = (id: string) => {
    dispatch({ type: 'DELETE_TAG', payload: id });
  };

  const updateFilter = (updates: Partial<TaskFilter>) => {
    dispatch({ type: 'UPDATE_FILTER', payload: updates });
  };

  const reorderTasks = (taskIds: string[]) => {
    dispatch({ type: 'REORDER_TASKS', payload: taskIds });
  };

  const filteredTasks = state.tasks.filter(task => {
    // Filter by status
    if (state.filter.status === 'active' && task.completed) return false;
    if (state.filter.status === 'completed' && !task.completed) return false;

    // Filter by priority
    if (state.filter.priority !== 'all' && task.priority !== state.filter.priority) return false;

    // Filter by tags
    if (state.filter.selectedTags.length > 0 && 
        !state.filter.selectedTags.some(tagId => task.tags.includes(tagId))) return false;

    // Filter by search term
    if (state.filter.searchTerm && 
        !task.title.toLowerCase().includes(state.filter.searchTerm.toLowerCase()) &&
        !task.description.toLowerCase().includes(state.filter.searchTerm.toLowerCase())) return false;

    return true;
  });

  const value = {
    tasks: filteredTasks,
    tags: state.tags,
    filter: state.filter,
    stats,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    addTag,
    deleteTag,
    updateFilter,
    reorderTasks
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

// Custom hook to use the context
export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext);
  
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  
  return context;
};