import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import LoginForm from '../../components/forms/LoginForm';
import Logo from '../../components/ui/Logo';
import { COLORS } from '../../lib/colors';
import { FONTS } from '../../lib/fonts';

const SignInScreen = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Logo size={90} />
          </View>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>
            Sign in to continue to GabAI Sense Guard
          </Text>
        </View>

        <View style={styles.formContainer}>
          <LoginForm />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <Link href="/(auth)/sign-up" style={styles.link}>
            <Text style={styles.linkText}>Sign up</Text>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral.lighter,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...FONTS.h1,
    color: COLORS.neutral.dark,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    ...FONTS.body,
    color: COLORS.neutral.medium,
    textAlign: 'center',
    lineHeight: 22,
  },
  formContainer: {
    width: '100%',
    marginBottom: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  footerText: {
    ...FONTS.body,
    color: COLORS.neutral.medium,
  },
  link: {
    marginLeft: 4,
  },
  linkText: {
    ...FONTS.body,
    color: COLORS.primary,
    fontWeight: '600',
  },
});

export default SignInScreen;
