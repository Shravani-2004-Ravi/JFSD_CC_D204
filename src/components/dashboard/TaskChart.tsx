import React from 'react';
import { useTaskContext } from '../../contexts/TaskContext';

const TaskChart: React.FC = () => {
  const { tasks } = useTaskContext();
  
  // Calculate data for the last 7 days
  const getLast7DaysData = () => {
    const data = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const nextDate = new Date(date);
      nextDate.setDate(date.getDate() + 1);
      
      const completedOnDate = tasks.filter(task => 
        task.completed && 
        new Date(task.createdAt) < nextDate && 
        (!task.dueDate || new Date(task.dueDate) >= date)
      ).length;
      
      const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      
      data.push({
        day: dayLabels[date.getDay()],
        completed: completedOnDate,
        date: date.toLocaleDateString()
      });
    }
    
    return data;
  };
  
  const chartData = getLast7DaysData();
  const maxValue = Math.max(...chartData.map(d => d.completed), 1);
  
  return (
    <div className="h-64">
      <div className="flex h-full items-end space-x-2">
        {chartData.map((data, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div className="text-xs font-medium text-gray-500 mb-1">
              {data.completed}
            </div>
            <div 
              className="w-full bg-blue-500 dark:bg-blue-600 rounded-t-md transition-all duration-500 ease-in-out"
              style={{ 
                height: `${(data.completed / maxValue) * 100}%`,
                minHeight: data.completed > 0 ? '8px' : '0'
              }}
            ></div>
            <div className="text-xs mt-2 font-medium">{data.day}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskChart;