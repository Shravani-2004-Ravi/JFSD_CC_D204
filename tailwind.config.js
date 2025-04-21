/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary
        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        // Secondary
        purple: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        // Accent
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        // Status colors
        red: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        yellow: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
      },
      animation: {
        'fadeIn': 'fadeIn 0.3s ease-in-out',
        'slideIn': 'slideIn 0.3s ease-in-out',
      },
    },
  },
  plugins: [],
  safelist: [
    // Colors for badges
    'bg-blue-100', 'text-blue-800', 'dark:bg-blue-900', 'dark:text-blue-200',
    'bg-purple-100', 'text-purple-800', 'dark:bg-purple-900', 'dark:text-purple-200',
    'bg-emerald-100', 'text-emerald-800', 'dark:bg-emerald-900', 'dark:text-emerald-200',
    'bg-red-100', 'text-red-800', 'dark:bg-red-900', 'dark:text-red-200',
    'bg-yellow-100', 'text-yellow-800', 'dark:bg-yellow-900', 'dark:text-yellow-200',
    'bg-gray-100', 'text-gray-800', 'dark:bg-gray-700', 'dark:text-gray-200',
    // Colors for tag buttons
    'bg-blue-500', 'ring-blue-500',
    'bg-purple-500', 'ring-purple-500',
    'bg-emerald-500', 'ring-emerald-500', 
    'bg-red-500', 'ring-red-500',
    'bg-yellow-500', 'ring-yellow-500',
    'bg-gray-500', 'ring-gray-500',
    // Border colors
    'border-blue-100', 'dark:border-blue-900/30',
    'border-purple-100', 'dark:border-purple-900/30',
    'border-emerald-100', 'dark:border-emerald-900/30',
    'border-red-100', 'dark:border-red-900/30',
    'border-yellow-100', 'dark:border-yellow-900/30',
  ],
};