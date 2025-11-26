import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '../../lib/colors';
import { FONTS } from '../../lib/fonts';
import { DESIGN_TOKENS } from '../../lib/design-tokens';

interface InputProps extends TextInputProps {
  label?: string;
  helperText?: string;
  error?: string;
  icon?: React.ComponentProps<typeof Ionicons>['name'];
}

const Input: React.FC<InputProps> = ({
  label,
  helperText,
  error,
  style,
  icon,
  secureTextEntry,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      {label ? (
        <Text style={[styles.label, error && styles.labelError]}>{label}</Text>
      ) : null}
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          error && styles.inputContainerError,
        ]}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color={error ? COLORS.error : isFocused ? COLORS.primary : COLORS.neutral.medium}
            style={styles.icon}
          />
        )}
        <TextInput
          style={[styles.input, icon && styles.inputWithIcon]}
          placeholderTextColor={COLORS.neutral.medium}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          {...rest}
        />
        {secureTextEntry && (
          <Pressable
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={isPasswordVisible ? 'eye-off' : 'eye'}
              size={20}
              color={COLORS.neutral.medium}
            />
          </Pressable>
        )}
      </View>
      {error ? (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={14} color={COLORS.error} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : helperText ? (
        <Text style={styles.helper}>{helperText}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: DESIGN_TOKENS.spacing.base,
  },
  label: {
    ...DESIGN_TOKENS.typography.smallBold,
    color: COLORS.neutral.dark,
    marginBottom: DESIGN_TOKENS.spacing.sm,
  },
  labelError: {
    color: COLORS.error,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderRadius: DESIGN_TOKENS.radius.lg,
    borderWidth: 1.5,
    borderColor: COLORS.surface.tertiary,
    backgroundColor: COLORS.surface.background,
    paddingHorizontal: DESIGN_TOKENS.spacing.base,
    ...DESIGN_TOKENS.shadows.sm,
  },
  inputContainerFocused: {
    borderColor: COLORS.primary,
    borderWidth: 2,
    ...DESIGN_TOKENS.shadows.md,
  },
  inputContainerError: {
    borderColor: COLORS.error,
    borderWidth: 2,
  },
  icon: {
    marginRight: DESIGN_TOKENS.spacing.sm,
  },
  input: {
    flex: 1,
    ...DESIGN_TOKENS.typography.body,
    color: COLORS.neutral.dark,
    padding: 0,
  },
  inputWithIcon: {
    marginLeft: 0,
  },
  eyeIcon: {
    padding: DESIGN_TOKENS.spacing.xs,
    marginLeft: DESIGN_TOKENS.spacing.sm,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DESIGN_TOKENS.spacing.xs,
    marginTop: DESIGN_TOKENS.spacing.xs,
  },
  helper: {
    ...DESIGN_TOKENS.typography.caption,
    color: COLORS.neutral.medium,
    marginTop: DESIGN_TOKENS.spacing.xs,
  },
  errorText: {
    ...DESIGN_TOKENS.typography.caption,
    color: COLORS.error,
    flex: 1,
  },
});

export default Input;



