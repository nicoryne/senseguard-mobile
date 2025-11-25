import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import SignupForm from '../../components/forms/SignupForm';
import { useAuth } from '../../context/auth-context';
import { COLORS } from '../../lib/colors';
import { FONTS } from '../../lib/fonts';

const SignUpScreen = () => {
  const { userRole } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.roleBadge}>
        <Ionicons name="person-circle" size={24} color={COLORS.primary} />
        <Text style={styles.roleText}>
          Signing up as {userRole ?? 'patient'}
        </Text>
      </View>
      <Text style={styles.title}>Create account</Text>
      <SignupForm />
      <Link href="/(auth)/sign-in" style={styles.link}>
        Have an account? Sign in
      </Link>
    </View>
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
  link: {
    ...FONTS.bodySmall,
    color: COLORS.primary,
    textAlign: 'center',
    marginTop: 16,
  },
});

export default SignUpScreen;

