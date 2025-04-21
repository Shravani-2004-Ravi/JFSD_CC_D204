import React from 'react';
import { useTaskContext } from '../../contexts/TaskContext';

const PriorityDistribution: React.FC = () => {
  const { tasks } = useTaskContext();
  
  // Calculate priority distribution
  const highPriorityCount = tasks.filter(task => task.priority === 'high').length;
  const mediumPriorityCount = tasks.filter(task => task.priority === 'medium').length;
  const lowPriorityCount = tasks.filter(task => task.priority === 'low').length;
  
  const total = tasks.length || 1; // Avoid division by zero
  
  const highPercentage = Math.round((highPriorityCount / total) * 100);
  const mediumPercentage = Math.round((mediumPriorityCount / total) * 100);
  const lowPercentage = Math.round((lowPriorityCount / total) * 100);
  
  return (
    <div className="space-y-4">
      <div className="h-4 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
        <div className="h-full flex">
          <div 
            className="bg-red-500 h-full transition-all duration-500"
            style={{ width: `${highPercentage}%` }}
          ></div>
          <div 
            className="bg-yellow-500 h-full transition-all duration-500"
            style={{ width: `${mediumPercentage}%` }}
          ></div>
          <div 
            className="bg-blue-500 h-full transition-all duration-500"
            style={{ width: `${lowPercentage}%` }}
          ></div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2 text-sm">
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
          <span className="text-gray-700 dark:text-gray-300">High ({highPriorityCount})</span>
        </div>
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
          <span className="text-gray-700 dark:text-gray-300">Medium ({mediumPriorityCount})</span>
        </div>
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
          <span className="text-gray-700 dark:text-gray-300">Low ({lowPriorityCount})</span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-medium mb-2">Tasks by Status</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="card bg-gray-50 dark:bg-gray-700/50 p-3">
            <div className="text-2xl font-semibold text-emerald-500">
              {tasks.filter(task => task.completed).length}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Completed</div>
          </div>
          <div className="card bg-gray-50 dark:bg-gray-700/50 p-3">
            <div className="text-2xl font-semibold text-blue-500">
              {tasks.filter(task => !task.completed).length}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Active</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriorityDistribution;