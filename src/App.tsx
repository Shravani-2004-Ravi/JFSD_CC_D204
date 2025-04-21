import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { TaskProvider } from './contexts/TaskContext';
import AppLayout from './components/layout/AppLayout';

function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <AppLayout />
      </TaskProvider>
    </ThemeProvider>
  );
}

export default App;