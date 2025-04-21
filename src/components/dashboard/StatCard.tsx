import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: 'blue' | 'emerald' | 'red' | 'purple' | 'yellow';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
  const getBgColor = () => {
    switch (color) {
      case 'blue': return 'bg-blue-50 dark:bg-blue-900/20';
      case 'emerald': return 'bg-emerald-50 dark:bg-emerald-900/20';
      case 'red': return 'bg-red-50 dark:bg-red-900/20';
      case 'purple': return 'bg-purple-50 dark:bg-purple-900/20';
      case 'yellow': return 'bg-yellow-50 dark:bg-yellow-900/20';
      default: return 'bg-gray-50 dark:bg-gray-900/20';
    }
  };

  return (
    <div className={`card ${getBgColor()} border border-${color}-100 dark:border-${color}-900/30 transition-all duration-200 hover:shadow-lg`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <p className="mt-1 text-2xl font-semibold">{value}</p>
        </div>
        <div className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-sm">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;