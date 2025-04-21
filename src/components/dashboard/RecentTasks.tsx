import React from 'react';
import { Task } from '../../types';
import { useTaskContext } from '../../contexts/TaskContext';
import { CheckCircle, Circle, Clock } from 'lucide-react';

interface RecentTasksProps {
  tasks: Task[];
}

const RecentTasks: React.FC<RecentTasksProps> = ({ tasks }) => {
  const { toggleTaskCompletion, tags } = useTaskContext();
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };
  
  const isOverdue = (task: Task) => {
    return !task.completed && task.dueDate && new Date(task.dueDate) < new Date();
  };
  
  const getTagById = (id: string) => {
    return tags.find(tag => tag.id === id);
  };
  
  return (
    <div className="overflow-hidden">
      {tasks.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 py-4 text-center">
          No tasks found. Start by creating a new task!
        </p>
      ) : (
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {tasks.map(task => (
            <li key={task.id} className="py-3 flex items-start animate-slideIn">
              <button 
                onClick={() => toggleTaskCompletion(task.id)}
                className="mt-1 mr-3 flex-shrink-0 text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
              >
                {task.completed 
                  ? <CheckCircle size={20} /> 
                  : <Circle size={20} />
                }
              </button>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center">
                  <p className={`text-sm font-medium ${
                    task.completed 
                      ? 'line-through text-gray-500 dark:text-gray-400' 
                      : 'text-gray-900 dark:text-gray-100'
                  }`}>
                    {task.title}
                  </p>
                </div>
                
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  {/* Priority badge */}
                  <span className={`badge ${
                    task.priority === 'high' 
                      ? 'badge-red' 
                      : task.priority === 'medium' 
                        ? 'badge-yellow' 
                        : 'badge-blue'
                  }`}>
                    {task.priority}
                  </span>
                  
                  {/* Due date badge */}
                  {task.dueDate && (
                    <span className={`badge flex items-center ${
                      isOverdue(task) ? 'badge-red' : 'badge-gray'
                    }`}>
                      <Clock size={12} className="mr-1" />
                      {formatDate(task.dueDate)}
                    </span>
                  )}
                  
                  {/* Tags */}
                  {task.tags.slice(0, 2).map(tagId => {
                    const tag = getTagById(tagId);
                    if (!tag) return null;
                    
                    return (
                      <span key={tagId} className={`badge badge-${tag.color}`}>
                        {tag.name}
                      </span>
                    );
                  })}
                  
                  {task.tags.length > 2 && (
                    <span className="badge badge-gray">
                      +{task.tags.length - 2}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="ml-3 flex-shrink-0 text-xs text-gray-500 dark:text-gray-400">
                {formatDate(task.createdAt)}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentTasks;