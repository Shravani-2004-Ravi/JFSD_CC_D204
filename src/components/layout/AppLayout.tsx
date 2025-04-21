import React, { useState } from 'react';
import { Sun, Moon, BarChart2, CheckCircle2, ListTodo, Tag, Plus } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import Dashboard from '../dashboard/Dashboard';
import TaskList from '../tasks/TaskList';
import TagManager from '../tags/TagManager';
import AddTaskModal from '../tasks/AddTaskModal';

enum View {
  Dashboard = 'dashboard',
  Tasks = 'tasks',
  Tags = 'tags',
}

const AppLayout: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [currentView, setCurrentView] = useState<View>(View.Dashboard);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center">
            <CheckCircle2 className="mr-2" size={24} />
            TaskMaster
          </h1>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsAddTaskModalOpen(true)}
              className="btn-primary flex items-center"
            >
              <Plus size={18} className="mr-1" />
              New Task
            </button>
            
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside className="md:w-64 flex-shrink-0">
            <nav className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setCurrentView(View.Dashboard)}
                    className={`flex items-center w-full px-4 py-2 rounded-md transition-colors ${
                      currentView === View.Dashboard
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <BarChart2 size={18} className="mr-3" />
                    Dashboard
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentView(View.Tasks)}
                    className={`flex items-center w-full px-4 py-2 rounded-md transition-colors ${
                      currentView === View.Tasks
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <ListTodo size={18} className="mr-3" />
                    Tasks
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentView(View.Tags)}
                    className={`flex items-center w-full px-4 py-2 rounded-md transition-colors ${
                      currentView === View.Tags
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Tag size={18} className="mr-3" />
                    Tags
                  </button>
                </li>
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            {currentView === View.Dashboard && <Dashboard />}
            {currentView === View.Tasks && <TaskList />}
            {currentView === View.Tags && <TagManager />}
          </main>
        </div>
      </div>

      {/* Add Task Modal */}
      {isAddTaskModalOpen && (
        <AddTaskModal onClose={() => setIsAddTaskModalOpen(false)} />
      )}
    </div>
  );
};

export default AppLayout;