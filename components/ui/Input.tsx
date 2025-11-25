import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

import { COLORS } from '../../lib/colors';
import { FONTS } from '../../lib/fonts';

interface InputProps extends TextInputProps {
  label?: string;
  helperText?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  helperText,
  error,
  style,
  ...rest
}) => {
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        style={[
          styles.input,
          error && styles.inputError,
          style,
        ]}
        placeholderTextColor={COLORS.neutral.medium}
        {...rest}
      />
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : helperText ? (
        <Text style={styles.helper}>{helperText}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    ...FONTS.bodySmall,
    color: COLORS.neutral.dark,
    marginBottom: 6,
  },
  input: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.surface.tertiary,
    backgroundColor: COLORS.surface.secondary,
    paddingHorizontal: 14,
    ...FONTS.body,
    color: COLORS.neutral.dark,
  },
  inputError: {
    borderColor: COLORS.error,
    borderWidth: 1.5,
  },
  helper: {
    ...FONTS.caption,
    color: COLORS.neutral.medium,
    marginTop: 4,
  },
  errorText: {
    ...FONTS.caption,
    color: COLORS.error,
    marginTop: 4,
  },
});

export default Input;



