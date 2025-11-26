import { View, ViewProps } from 'react-native'

interface CardProps extends ViewProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'elevated' | 'outlined'
}

export default function Card({ children, className = '', variant = 'default', ...props }: CardProps) {
  const baseClasses = 'bg-white rounded-lg'
  
  const variantClasses = {
    default: 'border border-[#e2e8f0]',
    elevated: 'border-0',
    outlined: 'border border-[#e2e8f0]',
  }

  const shadowStyle = variant === 'elevated' ? {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  } : variant === 'default' ? {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  } : {}

  return (
    <View
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={shadowStyle}
      {...props}
    >
      {children}
    </View>
  )
}

