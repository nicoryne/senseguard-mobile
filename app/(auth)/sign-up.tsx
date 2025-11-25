import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import SignupForm from '../../components/forms/SignupForm';
import Logo from '../../components/ui/Logo';
import { useAuth } from '../../context/auth-context';
import { COLORS } from '../../lib/colors';
import { FONTS } from '../../lib/fonts';

const SignUpScreen = () => {
  const { userRole } = useAuth();

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
          
          <View style={styles.roleBadge}>
            <Ionicons name="person-circle" size={20} color={COLORS.primary} />
            <Text style={styles.roleText}>
              Signing up as {userRole ?? 'patient'}
            </Text>
          </View>
          
          <Text style={styles.title}>Create your account</Text>
          <Text style={styles.subtitle}>
            Join GabAI Sense Guard to start managing your health
          </Text>
        </View>

        <View style={styles.formContainer}>
          <SignupForm />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <Link href="/(auth)/sign-in" style={styles.link}>
            <Text style={styles.linkText}>Sign in</Text>
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
    marginBottom: 32,
  },
  logoContainer: {
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.primary + '15',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
  },
  roleText: {
    ...FONTS.bodySmall,
    color: COLORS.primary,
    fontWeight: '600',
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

export default SignUpScreen;
