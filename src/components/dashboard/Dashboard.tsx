import React from 'react';
import { useTaskContext } from '../../contexts/TaskContext';
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  BarChart2
} from 'lucide-react';
import StatCard from './StatCard';
import TaskChart from './TaskChart';
import RecentTasks from './RecentTasks';
import PriorityDistribution from './PriorityDistribution';

const Dashboard: React.FC = () => {
  const { stats, tasks } = useTaskContext();
  
  // Get 5 most recent tasks
  const recentTasks = [...tasks]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 5);

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="Total Tasks" 
          value={stats.total} 
          icon={<ListTodo className="text-blue-500" />} 
          color="blue"
        />
        <StatCard 
          title="Completed" 
          value={stats.completed} 
          icon={<CheckCircle2 className="text-emerald-500" />} 
          color="emerald"
        />
        <StatCard 
          title="Overdue" 
          value={stats.overdue} 
          icon={<Clock className="text-red-500" />} 
          color="red"
        />
        <StatCard 
          title="Completion Rate" 
          value={`${stats.completionRate}%`} 
          icon={<BarChart2 className="text-purple-500" />} 
          color="purple"
        />
      </div>
      
      {/* Charts and Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Task Completion Chart</h3>
          <TaskChart />
        </div>
        
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Priority Distribution</h3>
          <PriorityDistribution />
        </div>
        
        <div className="card lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Recent Tasks</h3>
          <RecentTasks tasks={recentTasks} />
        </div>
      </div>
    </div>
  );
};

const ListTodo: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <line x1="8" y1="6" x2="21" y2="6"></line>
    <line x1="8" y1="12" x2="21" y2="12"></line>
    <line x1="8" y1="18" x2="21" y2="18"></line>
    <line x1="3" y1="6" x2="3.01" y2="6"></line>
    <line x1="3" y1="12" x2="3.01" y2="12"></line>
    <line x1="3" y1="18" x2="3.01" y2="18"></line>
  </svg>
);

export default Dashboard;