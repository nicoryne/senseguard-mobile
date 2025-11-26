import { useState } from 'react'
import { View, TextInput as RNTextInput, TouchableOpacity, Text } from 'react-native'
import { Feather } from '@expo/vector-icons'

interface TextInputProps {
  label: string
  placeholder: string
  value: string
  onChangeText: (text: string) => void
  secureTextEntry?: boolean
  icon: string
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad'
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
  editable?: boolean
  className?: string
}

export default function TextInput({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  icon,
  keyboardType = 'default',
  autoCapitalize = 'none',
  editable = true,
  className = '',
}: TextInputProps) {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = secureTextEntry

  return (
    <View className={`mb-4 ${className}`}>
      {/* Label */}
      <Text className="text-sm text-[#1a2332] mb-2 font-sans font-medium">{label}</Text>

      {/* Input Container */}
      <View className="flex-row items-center bg-input-bg rounded-lg border border-border px-3">
        {/* Icon */}
        <Feather name={icon as any} size={20} color="#a0aec0" className="mr-2.5" />

        {/* Input Field */}
        <RNTextInput
          className="flex-1 py-3 text-[#1a2332] font-sans text-sm"
          placeholder={placeholder}
          placeholderTextColor="#a0aec0"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isPassword && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          editable={editable}
        />

        {/* Password Toggle */}
        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="p-2">
            <Feather
              name={showPassword ? 'eye' : 'eye-off'}
              size={20}
              color="#a0aec0"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

