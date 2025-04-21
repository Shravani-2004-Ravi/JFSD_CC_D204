import React from 'react';
import { useTaskContext } from '../../contexts/TaskContext';
import { CheckCircle2, CircleDashed, AlertCircle as CircleAlert } from 'lucide-react';

const TaskFilters: React.FC = () => {
  const { filter, updateFilter, tags } = useTaskContext();
  
  const handleStatusChange = (status: 'all' | 'active' | 'completed') => {
    updateFilter({ status });
  };
  
  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFilter({ priority: e.target.value as 'all' | 'low' | 'medium' | 'high' });
  };
  
  const handleTagToggle = (tagId: string) => {
    const updatedTags = filter.selectedTags.includes(tagId)
      ? filter.selectedTags.filter(id => id !== tagId)
      : [...filter.selectedTags, tagId];
    
    updateFilter({ selectedTags: updatedTags });
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex flex-wrap gap-4">
        {/* Status filters */}
        <div className="flex-1 min-w-[180px]">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
            Status
          </label>
          <div className="flex space-x-2">
            <button
              onClick={() => handleStatusChange('all')}
              className={`px-3 py-1 text-sm rounded-md flex items-center ${
                filter.status === 'all'
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              } transition-colors`}
            >
              <CircleDashed size={14} className="mr-1" />
              All
            </button>
            <button
              onClick={() => handleStatusChange('active')}
              className={`px-3 py-1 text-sm rounded-md flex items-center ${
                filter.status === 'active'
                  ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              } transition-colors`}
            >
              <CircleAlert size={14} className="mr-1" />
              Active
            </button>
            <button
              onClick={() => handleStatusChange('completed')}
              className={`px-3 py-1 text-sm rounded-md flex items-center ${
                filter.status === 'completed'
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              } transition-colors`}
            >
              <CheckCircle2 size={14} className="mr-1" />
              Completed
            </button>
          </div>
        </div>
        
        {/* Priority filter */}
        <div className="flex-1 min-w-[150px]">
          <label htmlFor="priority-filter" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
            Priority
          </label>
          <select
            id="priority-filter"
            value={filter.priority}
            onChange={handlePriorityChange}
            className="select bg-right"
            style={{ backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")` }}
          >
            <option value="all">All priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
      
      {/* Tags filter */}
      {tags.length > 0 && (
        <div className="mt-4">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
            Tags
          </label>
          <div className="flex flex-wrap gap-2 mt-1">
            {tags.map(tag => (
              <button
                key={tag.id}
                onClick={() => handleTagToggle(tag.id)}
                className={`px-3 py-1 text-xs rounded-full ${
                  filter.selectedTags.includes(tag.id)
                    ? `bg-${tag.color}-100 text-${tag.color}-800 dark:bg-${tag.color}-900 dark:text-${tag.color}-200 ring-2 ring-${tag.color}-500`
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                } transition-all`}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Clear filters button - only show if filters are applied */}
      {(filter.status !== 'all' || filter.priority !== 'all' || filter.selectedTags.length > 0) && (
        <div className="mt-4 text-right">
          <button
            onClick={() => updateFilter({
              status: 'all',
              priority: 'all',
              selectedTags: [],
              searchTerm: filter.searchTerm // Keep search term
            })}
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskFilters;