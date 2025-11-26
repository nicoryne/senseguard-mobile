import { View, ViewProps } from 'react-native';
import { ReactNode } from 'react';

interface CardProps extends ViewProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined';
}

export default function Card({ children, className = '', variant = 'default', ...props }: CardProps) {
  const baseClasses = 'bg-white rounded-2xl';
  
  const variantClasses = {
    default: 'shadow-md',
    elevated: 'shadow-lg',
    outlined: 'border border-[#E5E7EB]',
  };

  return (
    <View
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </View>
  );
}

