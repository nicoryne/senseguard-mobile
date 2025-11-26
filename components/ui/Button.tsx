import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native'
import { Feather } from '@expo/vector-icons'

interface ButtonProps {
  title?: string
  children?: React.ReactNode
  onPress: () => void
  loading?: boolean
  variant?: 'primary' | 'secondary' | 'danger' | 'outline'
  disabled?: boolean
  className?: string
  icon?: string
  iconPosition?: 'left' | 'right'
}

export default function Button({
  title,
  children,
  onPress,
  loading = false,
  variant = 'primary',
  disabled = false,
  className = '',
  icon,
  iconPosition = 'left',
}: ButtonProps) {
  const isPrimary = variant === 'primary'
  const isSecondary = variant === 'secondary'
  const isDanger = variant === 'danger'
  const isOutline = variant === 'outline'
  const isDisabled = disabled || loading
  
  // Use brand colors
  const bgColor = isPrimary ? '#4982BB' : isSecondary ? '#e7a38d' : isDanger ? '#EF4444' : 'transparent'
  const textColor = isOutline ? '#4982BB' : '#ffffff'
  const iconColor = textColor
  const borderColor = isOutline ? '#4982BB' : 'transparent'

  return (
    <TouchableOpacity
      className={`py-3.5 rounded-lg items-center justify-center flex-row ${
        isDisabled ? 'opacity-50' : ''
      } ${className}`}
      style={{
        backgroundColor: bgColor,
        borderWidth: isOutline ? 1 : 0,
        borderColor: borderColor,
      }}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <View className="flex-row items-center">
          {icon && iconPosition === 'left' && (
            <Feather name={icon as any} size={20} color={iconColor} style={{ marginRight: 8 }} />
          )}
          {children || (
            <Text
              className="text-base font-semibold"
              style={{ color: textColor, fontFamily: 'Roboto' }}
            >
              {title}
            </Text>
          )}
          {icon && iconPosition === 'right' && (
            <Feather name={icon as any} size={20} color={iconColor} style={{ marginLeft: 8 }} />
          )}
        </View>
      )}
    </TouchableOpacity>
  )
}

