import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';

import LoginForm from '../../components/Forms/LoginForm';
import { useAuth } from '../../context/AuthContext';
import { COLORS } from '../../utils/colors';
import { FONTS } from '../../utils/fonts';

const LoginScreen = ({ navigation }: any) => {
  const { logIn, loading } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome back</Text>
      <Text style={styles.subtitle}>Sign in to access your dashboard.</Text>
      <LoginForm onSubmit={logIn} loading={loading} />
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.link}>New here? Create an account</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: COLORS.neutral.lighter,
  },
  title: {
    ...FONTS.h1,
    color: COLORS.neutral.dark,
    marginBottom: 8,
  },
  subtitle: {
    ...FONTS.body,
    color: COLORS.neutral.medium,
    marginBottom: 24,
  },
  link: {
    ...FONTS.bodySmall,
    color: COLORS.primary,
    textAlign: 'center',
    marginTop: 16,
  },
});

export default LoginScreen;

