import React, { useState } from 'react';
import { useTaskContext } from '../../contexts/TaskContext';
import TaskItem from './TaskItem';
import TaskFilters from './TaskFilters';
import TaskSearch from './TaskSearch';
import { PlusCircle } from 'lucide-react';
import AddTaskModal from './AddTaskModal';

const TaskList: React.FC = () => {
  const { tasks } = useTaskContext();
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  return (
    <div className="animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-bold mb-4 sm:mb-0">Tasks</h2>
        <button 
          onClick={() => setIsAddTaskModalOpen(true)}
          className="btn-primary flex items-center"
        >
          <PlusCircle size={18} className="mr-1" />
          Add Task
        </button>
      </div>
      
      <div className="mb-6 space-y-4">
        <TaskSearch />
        <TaskFilters />
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg">
        {tasks.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-4">No tasks found based on your filters.</p>
            <button 
              onClick={() => setIsAddTaskModalOpen(true)}
              className="btn-primary"
            >
              Create your first task
            </button>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {tasks.map(task => (
              <TaskItem key={task.id} task={task} />
            ))}
          </ul>
        )}
      </div>
      
      {isAddTaskModalOpen && (
        <AddTaskModal onClose={() => setIsAddTaskModalOpen(false)} />
      )}
    </div>
  );
};

export default TaskList;