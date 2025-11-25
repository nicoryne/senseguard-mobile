import React from 'react'
import { TextInput as RNTextInput, View, Text, StyleSheet } from 'react-native'
import { COLORS } from '../../lib/colors'
import { FONTS } from '../../lib/fonts'

interface TextInputProps {
  label?: string
  placeholder?: string
  value: string
  onChangeText: (text: string) => void
  secureTextEntry?: boolean
  error?: string
  className?: string
}

export default function TextInput({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  error,
  className = '',
}: TextInputProps) {
  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label}
        </Text>
      )}
      <RNTextInput
        style={[
          styles.input,
          error && styles.inputError,
        ]}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    ...FONTS.bodySmall,
    color: COLORS.neutral.dark,
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.surface.tertiary,
    backgroundColor: COLORS.surface.secondary,
    paddingHorizontal: 16,
    ...FONTS.body,
    color: COLORS.neutral.dark,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  errorText: {
    ...FONTS.bodySmall,
    color: COLORS.error,
    marginTop: 4,
  },
})

