export const COLORS = {
  primary: '#4982BB',
  accent: '#e7a38d',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  neutral: {
    lightest: '#FFFFFF',
    lighter: '#F8F9FA',
    light: '#F3F4F6',
    medium: '#6B7280',
    dark: '#2A2D34',
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
};

export type ColorName = keyof typeof COLORS;

