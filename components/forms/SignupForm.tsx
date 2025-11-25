import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useAuth } from '../../context/auth-context';
import { isValidEmail, isValidPassword } from '../../utils/validators';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { COLORS } from '../../lib/colors';
import { FONTS } from '../../lib/fonts';

const SignupForm = () => {
  const { signUp, userRole, loading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!isValidPassword(password)) {
      newErrors.password = 'Password must be at least 8 characters with uppercase, lowercase, and a number';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      await signUp(email.trim(), password, userRole ?? 'patient', {
        name: name.trim(),
        firstName: name.trim().split(' ')[0],
        lastName: name.trim().split(' ').slice(1).join(' ') || '',
      });
      // Navigation will be handled by auth context
    } catch (error: any) {
      console.error('Signup error:', error);
      let errorMessage = 'Failed to create account. Please try again.';
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'An account with this email already exists.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak. Please use a stronger password.';
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
        label="Full Name"
        value={name}
        onChangeText={(text) => {
          setName(text);
          if (errors.name) setErrors({ ...errors, name: undefined });
        }}
        error={errors.name}
        placeholder="Enter your full name"
        autoCapitalize="words"
      />
      
      <Input
        label="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          if (errors.email) setErrors({ ...errors, email: undefined });
        }}
        error={errors.email}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        placeholder="Enter your email"
      />
      
      <Input
        label="Password"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          if (errors.password) setErrors({ ...errors, password: undefined });
        }}
        error={errors.password}
        secureTextEntry
        autoComplete="password-new"
        placeholder="Create a password"
      />
      
      <Input
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={(text) => {
          setConfirmPassword(text);
          if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: undefined });
        }}
        error={errors.confirmPassword}
        secureTextEntry
        autoComplete="password-new"
        placeholder="Confirm your password"
      />
      
      <Button
        title="Create account"
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

export default SignupForm;
