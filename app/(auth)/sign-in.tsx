import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import LoginForm from '../../components/forms/LoginForm';
import { COLORS } from '../../lib/colors';
import { FONTS } from '../../lib/fonts';

const SignInScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back</Text>
      <Text style={styles.subtitle}>Sign in to access your dashboards.</Text>
      <LoginForm />
      <Link href="/(auth)/sign-up" style={styles.link}>
        New here? Create an account
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

export default SignInScreen;

