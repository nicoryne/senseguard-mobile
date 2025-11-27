/**
 * Enhanced Design Tokens for GabAI Sense Guard
 * Modern design system with gradients, shadows, and spacing
 */

export const DESIGN_TOKENS = {
  // Enhanced Color Palette
  colors: {
    primary: {
      main: '#4982BB',
      light: '#6BA3D1',
      dark: '#3A6A9A',
      gradient: ['#4982BB', '#5A9FD4'],
      gradientLight: ['#6BA3D1', '#8BC5E8'],
    },
    accent: {
      main: '#e7a38d',
      light: '#F5C4B3',
      dark: '#D88A6F',
      gradient: ['#e7a38d', '#F5C4B3'],
    },
    success: {
      main: '#10B981',
      light: '#34D399',
      dark: '#059669',
      gradient: ['#10B981', '#34D399'],
    },
    warning: {
      main: '#F59E0B',
      light: '#FBBF24',
      dark: '#D97706',
      gradient: ['#F59E0B', '#FBBF24'],
    },
    error: {
      main: '#EF4444',
      light: '#F87171',
      dark: '#DC2626',
      gradient: ['#EF4444', '#F87171'],
    },
    neutral: {
      lightest: '#FFFFFF',
      lighter: '#F8F9FA',
      light: '#F3F4F6',
      medium: '#6B7280',
      dark: '#2A2D34',
      darker: '#1F2937',
    },
    surface: {
      background: '#FFFFFF',
      secondary: '#F9FAFB',
      tertiary: '#F3F4F6',
      elevated: '#FFFFFF',
    },
  },

  // Modern Shadow System
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 16,
      elevation: 8,
    },
    xl: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 24,
      elevation: 12,
    },
    colored: {
      primary: {
        shadowColor: '#4982BB',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 8,
      },
      accent: {
        shadowColor: '#e7a38d',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 8,
      },
    },
  },

  // Spacing System (4px grid)
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    base: 16,
    lg: 20,
    xl: 24,
    '2xl': 32,
    '3xl': 40,
    '4xl': 48,
    '5xl': 64,
  },

  // Border Radius
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    full: 9999,
  },

  // Typography Scale
  typography: {
    h1: {
      fontSize: 32,
      lineHeight: 40,
      fontWeight: '700' as const,
      letterSpacing: -0.5,
    },
    h2: {
      fontSize: 24,
      lineHeight: 32,
      fontWeight: '700' as const,
      letterSpacing: -0.3,
    },
    h3: {
      fontSize: 20,
      lineHeight: 28,
      fontWeight: '600' as const,
      letterSpacing: -0.2,
    },
    h4: {
      fontSize: 18,
      lineHeight: 26,
      fontWeight: '600' as const,
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '400' as const,
    },
    bodyBold: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '600' as const,
    },
    small: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: '400' as const,
    },
    smallBold: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: '600' as const,
    },
    caption: {
      fontSize: 12,
      lineHeight: 18,
      fontWeight: '400' as const,
    },
    captionBold: {
      fontSize: 12,
      lineHeight: 18,
      fontWeight: '600' as const,
    },
  },

  // Animation Durations
  animation: {
    fast: 150,
    normal: 300,
    slow: 500,
  },

  // Z-Index Scale
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
};

export default DESIGN_TOKENS;


