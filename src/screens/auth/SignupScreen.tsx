import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import SignupForm from '../../components/Forms/SignupForm';
import { useAuth } from '../../context/AuthContext';
import { COLORS } from '../../utils/colors';
import { FONTS } from '../../utils/fonts';

const SignupScreen = ({ navigation }: any) => {
  const { signUp, userRole, loading } = useAuth();

  const handleSignup = async (name: string, email: string, password: string) => {
    await signUp(email, password, userRole ?? 'patient', { name });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.roleBadge}>
        <Ionicons name="person-circle" size={24} color={COLORS.primary} />
        <Text style={styles.roleText}>
          Signing up as {userRole ?? 'patient'}
        </Text>
      </View>
      <Text style={styles.title}>Create account</Text>
      <SignupForm onSubmit={handleSignup} loading={loading} />
      <Text style={styles.helper} onPress={() => navigation.navigate('Login')}>
        Have an account? Sign in
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: COLORS.neutral.lighter,
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  roleText: {
    ...FONTS.bodySmall,
    color: COLORS.neutral.medium,
  },
  title: {
    ...FONTS.h1,
    color: COLORS.neutral.dark,
    marginBottom: 24,
  },
  helper: {
    ...FONTS.bodySmall,
    color: COLORS.primary,
    textAlign: 'center',
    marginTop: 16,
  },
});

export default SignupScreen;

