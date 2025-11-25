import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useAuth } from '../../context/auth-context';
import { isValidEmail } from '../../utils/validators';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { COLORS } from '../../lib/colors';
import { FONTS } from '../../lib/fonts';

const LoginForm = () => {
  const { logIn, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    setErrors({});
    
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await logIn(email.trim(), password);
      // Navigation will be handled by auth context
    } catch (error: any) {
      console.error('Login error:', error);
      let errorMessage = 'Failed to sign in. Please try again.';
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password. Please try again.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.';
      } else if (error.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid email or password.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setErrors({ general: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      {errors.general && (
        <View style={styles.errorBanner}>
          <Ionicons name="alert-circle" size={20} color={COLORS.error} />
          <Text style={styles.errorBannerText}>{errors.general}</Text>
        </View>
      )}
      
      <Input
        label="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          if (errors.email) setErrors({ ...errors, email: undefined });
        }}
        error={errors.email}
        placeholder="Enter your email"
      />
      
      <Input
        label="Password"
        secureTextEntry
        autoComplete="password"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          if (errors.password) setErrors({ ...errors, password: undefined });
        }}
        error={errors.password}
        placeholder="Enter your password"
      />
      
      <Button
        title="Sign in"
        onPress={handleSubmit}
        loading={loading || isSubmitting}
        disabled={loading || isSubmitting}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.error + '15',
    borderLeftWidth: 4,
    borderLeftColor: COLORS.error,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    gap: 8,
  },
  errorBannerText: {
    ...FONTS.bodySmall,
    color: COLORS.error,
    flex: 1,
  },
});

export default LoginForm;
