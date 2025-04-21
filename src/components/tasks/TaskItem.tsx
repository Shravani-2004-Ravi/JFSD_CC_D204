import React, { useState } from 'react';
import { Task } from '../../types';
import { useTaskContext } from '../../contexts/TaskContext';
import { 
  CheckCircle, 
  Circle, 
  Clock, 
  Trash2, 
  Edit, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';
import EditTaskModal from './EditTaskModal';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { toggleTaskCompletion, deleteTask, tags } = useTaskContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const formatDate = (date: Date | null) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'short', 
      day: 'numeric'
    });
  };
  
  const isOverdue = () => {
    return !task.completed && task.dueDate && new Date(task.dueDate) < new Date();
  };
  
  const getTagById = (id: string) => {
    return tags.find(tag => tag.id === id);
  };
  
  return (
    <li className="p-4 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors duration-150 animate-fadeIn">
      <div className="flex items-start">
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
            <h3 className={`text-base font-medium ${
              task.completed 
                ? 'line-through text-gray-500 dark:text-gray-400' 
                : 'text-gray-900 dark:text-gray-100'
            }`}>
              {task.title}
            </h3>
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
                isOverdue() ? 'badge-red' : 'badge-gray'
              }`}>
                <Clock size={12} className="mr-1" />
                {formatDate(task.dueDate)}
              </span>
            )}
            
            {/* Tags */}
            {task.tags.slice(0, 3).map(tagId => {
              const tag = getTagById(tagId);
              if (!tag) return null;
              
              return (
                <span key={tagId} className={`badge badge-${tag.color}`}>
                  {tag.name}
                </span>
              );
            })}
            
            {task.tags.length > 3 && (
              <span className="badge badge-gray">
                +{task.tags.length - 3}
              </span>
            )}
          </div>
        </div>
        
        <div className="ml-4 flex-shrink-0 flex items-center space-x-2">
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Edit task"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => deleteTask(task.id)}
            className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Delete task"
          >
            <Trash2 size={16} />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label={isExpanded ? "Collapse task" : "Expand task"}
          >
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>
      
      {/* Expanded content */}
      {isExpanded && task.description && (
        <div className="mt-3 ml-8 p-3 bg-gray-100 dark:bg-gray-800 rounded-md animate-slideIn">
          <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
            {task.description}
          </p>
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Created: {formatDate(task.createdAt)}
          </div>
        </div>
      )}
      
      {/* Edit Modal */}
      {isEditModalOpen && (
        <EditTaskModal task={task} onClose={() => setIsEditModalOpen(false)} />
      )}
    </li>
  );
};

export default TaskItem;