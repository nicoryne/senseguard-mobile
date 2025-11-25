/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#4982BB', // Primary Blue
        accent: '#e7a38d', // Terracotta
        success: '#10B981', // Success Green
        warning: '#F59E0B', // Warning Orange
        error: '#EF4444', // Error Red
        neutral: {
          light: '#F8F9FA',
          lighter: '#FFFFFF',
          dark: '#2A2D34',
          medium: '#6B7280',
        },
        surface: {
          background: '#FFFFFF',
          secondary: '#F3F4F6',
          tertiary: '#E5E7EB',
        },
        pressure: {
          low: '#0EA5E9',
          moderate: '#84CC16',
          high: '#FBBF24',
          critical: '#EF4444',
        },
        // Legacy support
        text: '#ffffff',
        'text-secondary': '#a0aec0',
        border: '#e2e8f0',
        'input-bg': '#f7fafc',
      },
      fontFamily: {
        heading: ['Inter', 'System'],
        sans: ['Roboto', 'System'],
        body: ['Roboto', 'System'],
      },
    },
  },
  plugins: [],
}
