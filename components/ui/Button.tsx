import { Pressable, Text, ViewStyle } from 'react-native';
import { ReactNode } from 'react';

interface ButtonProps {
  onPress: () => void;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  disabled?: boolean;
  className?: string;
  style?: ViewStyle;
}

export default function Button({
  onPress,
  children,
  variant = 'primary',
  disabled = false,
  className = '',
  style,
}: ButtonProps) {
  const baseClasses = 'rounded-xl py-4 px-6 active:opacity-80';
  
  const variantClasses = {
    primary: 'bg-[#4982BB]',
    secondary: 'bg-[#e7a38d]',
    danger: 'bg-[#EF4444]',
    outline: 'bg-transparent border-2 border-[#4982BB]',
  };

  const textClasses = {
    primary: 'text-white',
    secondary: 'text-white',
    danger: 'text-white',
    outline: 'text-[#4982BB]',
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${disabled ? 'opacity-50' : ''} ${className}`}
      style={style}
    >
      <Text
        className={`text-center font-semibold text-base ${textClasses[variant]}`}
        style={{ fontFamily: 'Roboto' }}
      >
        {children}
      </Text>
    </Pressable>
  );
}
