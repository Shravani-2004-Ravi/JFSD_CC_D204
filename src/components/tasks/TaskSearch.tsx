import React, { useState, useEffect } from 'react';
import { useTaskContext } from '../../contexts/TaskContext';
import { Search, X } from 'lucide-react';

const TaskSearch: React.FC = () => {
  const { filter, updateFilter } = useTaskContext();
  const [searchValue, setSearchValue] = useState(filter.searchTerm);
  
  // Update search term with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      updateFilter({ searchTerm: searchValue });
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchValue, updateFilter]);
  
  const handleClear = () => {
    setSearchValue('');
    updateFilter({ searchTerm: '' });
  };
  
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search size={18} className="text-gray-500 dark:text-gray-400" />
      </div>
      <input
        type="text"
        className="input pl-10 pr-10"
        placeholder="Search tasks..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {searchValue && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};

export default TaskSearch;