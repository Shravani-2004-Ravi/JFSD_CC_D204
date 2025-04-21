import React, { useState } from 'react';
import { useTaskContext } from '../../contexts/TaskContext';
import { PlusCircle, Trash2, Tag } from 'lucide-react';

const TAG_COLORS = ['blue', 'purple', 'emerald', 'red', 'yellow', 'gray'];

const TagManager: React.FC = () => {
  const { tags, addTag, deleteTag } = useTaskContext();
  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState<string>('blue');
  
  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newTagName.trim()) return;
    
    addTag({
      name: newTagName.trim(),
      color: newTagColor,
    });
    
    setNewTagName('');
  };
  
  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold mb-6">Manage Tags</h2>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3">Create New Tag</h3>
        <form onSubmit={handleAddTag} className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label htmlFor="tag-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tag Name
              </label>
              <input
                type="text"
                id="tag-name"
                className="input"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                placeholder="Enter tag name"
              />
            </div>
            
            <div className="w-40">
              <label htmlFor="tag-color" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tag Color
              </label>
              <div className="grid grid-cols-6 gap-2">
                {TAG_COLORS.map(color => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setNewTagColor(color)}
                    className={`w-6 h-6 rounded-full bg-${color}-500 ${
                      newTagColor === color ? 'ring-2 ring-offset-2 ring-gray-700 dark:ring-gray-300' : ''
                    }`}
                    aria-label={`Select ${color} color`}
                  />
                ))}
              </div>
            </div>
            
            <div className="flex items-end">
              <button 
                type="submit" 
                className="btn-primary flex items-center" 
                disabled={!newTagName.trim()}
              >
                <PlusCircle size={18} className="mr-1" />
                Add Tag
              </button>
            </div>
          </div>
        </form>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3">Your Tags</h3>
        {tags.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg text-center">
            No tags created yet. Create your first tag above.
          </p>
        ) : (
          <ul className="space-y-2">
            {tags.map(tag => (
              <li key={tag.id} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-md shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <span className={`inline-block w-4 h-4 rounded-full bg-${tag.color}-500 mr-3`} />
                  <span className="font-medium">{tag.name}</span>
                </div>
                <button
                  onClick={() => deleteTag(tag.id)}
                  className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label={`Delete ${tag.name} tag`}
                >
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TagManager;